import { useRef } from "react";
import { Group, TextureLoader } from "three";
import { Decal, Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { GroupProps, useFrame, useLoader } from "@react-three/fiber";


interface TShirtProps extends GroupProps {
    decalImage: string
}
export function Tshirt({ decalImage, ...rest }: TShirtProps) {
    const meshRef = useRef<Group>()
    // @ts-ignore
    const { nodes, materials } = useGLTF("/shirt_baked.glb");

    const texture = useLoader(TextureLoader, decalImage)

    useFrame(() => (meshRef.current.rotation.y += 0.005))

    return (
        <>
            <group ref={meshRef} {...rest} dispose={null}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.T_Shirt_male.geometry}
                    material={materials.lambert1}
                    dispose={null}
                >
                    <Decal
                        // debug
                        position={[0, 0, 0.2]}
                        rotation={[0, 0, 0]}
                        scale={0.25}
                        map={texture}
                    />

                </mesh>
            </group>

            <OrbitControls autoRotate minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />

            {/* <SpotLight color="#0c8cbf" position={[3, 3, 2]}/> */}
            <ambientLight intensity={0.4} />
            <Environment preset="city" />
        </>

    )

}

// useGLTF.preload("/shirt_baked.glb");