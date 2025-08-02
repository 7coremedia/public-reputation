import { Canvas } from "@react-three/fiber"
import { Sphere, MeshWobbleMaterial } from "@react-three/drei"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

interface Avatar3DProps {
  className?: string
  size?: number
}

function AvatarMesh() {
  return (
    <Sphere args={[0.8, 32, 32]}>
      <MeshWobbleMaterial
        color="#6366f1"
        attach="material"
        factor={0.1}
        speed={2}
        roughness={0.8}
        metalness={0.2}
      />
    </Sphere>
  )
}

export function Avatar3D({ className, size = 40 }: Avatar3DProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/account")
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "rounded-full overflow-hidden hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        className
      )}
      style={{ width: size, height: size }}
      aria-label="Go to profile"
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 1]} intensity={0.8} />
        <AvatarMesh />
      </Canvas>
    </button>
  )
}