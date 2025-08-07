-- Create businesses table
CREATE TABLE public.businesses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  website TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  is_verified BOOLEAN DEFAULT false,
  is_claimed BOOLEAN DEFAULT false,
  claimed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

-- Create policies for businesses
CREATE POLICY "Businesses are viewable by everyone" 
ON public.businesses 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create businesses" 
ON public.businesses 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Business owners can update their businesses" 
ON public.businesses 
FOR UPDATE 
TO authenticated
USING (claimed_by = auth.uid());

-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  icon TEXT,
  description TEXT,
  business_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone" 
ON public.categories 
FOR SELECT 
USING (true);

-- Create opinions table
CREATE TABLE public.opinions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('complaint', 'praise', 'suggestion')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'resolved', 'dismissed')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  is_anonymous BOOLEAN DEFAULT false,
  is_public BOOLEAN DEFAULT true,
  proof_files TEXT[], -- Array of file URLs
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for opinions
ALTER TABLE public.opinions ENABLE ROW LEVEL SECURITY;

-- Create policies for opinions
CREATE POLICY "Public opinions are viewable by everyone" 
ON public.opinions 
FOR SELECT 
USING (is_public = true);

CREATE POLICY "Users can view their own opinions" 
ON public.opinions 
FOR SELECT 
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Business owners can view opinions about their businesses" 
ON public.opinions 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.businesses b 
    WHERE b.id = business_id AND b.claimed_by = auth.uid()
  )
);

CREATE POLICY "Authenticated users can create opinions" 
ON public.opinions 
FOR INSERT 
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own opinions" 
ON public.opinions 
FOR UPDATE 
TO authenticated
USING (user_id = auth.uid());

-- Create opinion timeline table for tracking progress
CREATE TABLE public.opinion_timeline (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  opinion_id UUID NOT NULL REFERENCES public.opinions(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  message TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for opinion timeline
ALTER TABLE public.opinion_timeline ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Timeline entries are viewable by opinion stakeholders" 
ON public.opinion_timeline 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.opinions o 
    WHERE o.id = opinion_id 
    AND (
      o.user_id = auth.uid() OR 
      o.is_public = true OR
      EXISTS (
        SELECT 1 FROM public.businesses b 
        WHERE b.id = o.business_id AND b.claimed_by = auth.uid()
      )
    )
  )
);

-- Create business responses table
CREATE TABLE public.business_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  opinion_id UUID NOT NULL REFERENCES public.opinions(id) ON DELETE CASCADE,
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  response_text TEXT NOT NULL,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for business responses
ALTER TABLE public.business_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Business responses are viewable by opinion stakeholders" 
ON public.business_responses 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.opinions o 
    WHERE o.id = opinion_id 
    AND (
      o.user_id = auth.uid() OR 
      o.is_public = true OR
      EXISTS (
        SELECT 1 FROM public.businesses b 
        WHERE b.id = business_id AND b.claimed_by = auth.uid()
      )
    )
  )
);

CREATE POLICY "Business owners can create responses" 
ON public.business_responses 
FOR INSERT 
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.businesses b 
    WHERE b.id = business_id AND b.claimed_by = auth.uid()
  ) AND created_by = auth.uid()
);

-- Create indexes for better performance
CREATE INDEX idx_businesses_category ON public.businesses(category);
CREATE INDEX idx_businesses_city ON public.businesses(city);
CREATE INDEX idx_businesses_claimed_by ON public.businesses(claimed_by);
CREATE INDEX idx_opinions_business_id ON public.opinions(business_id);
CREATE INDEX idx_opinions_user_id ON public.opinions(user_id);
CREATE INDEX idx_opinions_status ON public.opinions(status);
CREATE INDEX idx_opinions_created_at ON public.opinions(created_at);
CREATE INDEX idx_opinion_timeline_opinion_id ON public.opinion_timeline(opinion_id);

-- Add triggers for updated_at columns
CREATE TRIGGER update_businesses_updated_at
BEFORE UPDATE ON public.businesses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_opinions_updated_at
BEFORE UPDATE ON public.opinions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_business_responses_updated_at
BEFORE UPDATE ON public.business_responses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some default categories
INSERT INTO public.categories (name, icon, description) VALUES
('Food & Restaurant', 'UtensilsCrossed', 'Restaurants, cafes, food delivery services'),
('Retail & Shopping', 'ShoppingBag', 'Stores, e-commerce, shopping centers'),
('Healthcare', 'Heart', 'Hospitals, clinics, medical services'),
('Technology', 'Smartphone', 'Tech companies, software, IT services'),
('Financial Services', 'CreditCard', 'Banks, insurance, financial advisors'),
('Travel & Hospitality', 'Plane', 'Hotels, airlines, travel agencies'),
('Automotive', 'Car', 'Car dealers, repair shops, automotive services'),
('Real Estate', 'Home', 'Real estate agents, property management'),
('Education', 'GraduationCap', 'Schools, universities, online courses'),
('Beauty & Wellness', 'Sparkles', 'Salons, spas, fitness centers'),
('Professional Services', 'Briefcase', 'Legal, consulting, business services'),
('Utilities', 'Zap', 'Internet, phone, electricity providers');