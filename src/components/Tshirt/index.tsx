import { Decal, Environment, PresentationControls, useGLTF } from "@react-three/drei";
import { Canvas, GroupProps } from "@react-three/fiber";

export function Tshirt(props: GroupProps) {
    // @ts-ignore
    const { nodes, materials } = useGLTF("/shirt_baked.glb");
    // const texture = useTexture("/react.png")

    return (
        <Canvas
            style={{
                width: "100%",
                height: 656,
            }}>
            <PresentationControls azimuth={[-Infinity, Infinity]}>
                <group {...props} dispose={null}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.T_Shirt_male.geometry}
                        material={materials.lambert1}
                        dispose={null}
                    >
                        <Decal
                            debug
                            position={[0, 0, 0]}
                            rotation={[0, 0, 0]}
                            scale={1}
                        // map={texture}
                        />

                    </mesh>
                </group>
            </PresentationControls>
            <Environment preset="studio" />
        </Canvas>
    )

}

useGLTF.preload("/shirt_baked.glb");