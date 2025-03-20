import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HexColorPicker } from 'react-colorful';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function FaceCustomizer() {
  const [skinColor, setSkinColor] = useState("#FFB6C1");
  const [eyeSize, setEyeSize] = useState(20);
  const [mouthWidth, setMouthWidth] = useState(40);
  const [expression, setExpression] = useState("happy");

  const Face = () => (
    <motion.svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {/* Face Circle */}
      <circle cx="100" cy="100" r="90" fill={skinColor} />
      
      {/* Eyes */}
      <motion.g
        initial={{ y: 10 }}
        animate={{ y: expression === "happy" ? 0 : 5 }}
      >
        <circle cx="70" cy="80" r={eyeSize} fill="white" />
        <circle cx="130" cy="80" r={eyeSize} fill="white" />
        <circle cx="70" cy="80" r={eyeSize * 0.4} fill="#333" />
        <circle cx="130" cy="80" r={eyeSize * 0.4} fill="#333" />
      </motion.g>

      {/* Mouth */}
      <motion.path
        d={expression === "happy" 
          ? `M${100 - mouthWidth} 120 Q 100 ${140} ${100 + mouthWidth} 120`
          : `M${100 - mouthWidth} 140 Q 100 ${120} ${100 + mouthWidth} 140`}
        stroke="#333"
        strokeWidth="4"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
    </motion.svg>
  );

  return (
    <Card className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-full p-4 shadow-xl"
          >
            <Face />
          </motion.div>
        </div>

        <div className="flex-1 space-y-6">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="colors">Colors</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Eye Size</label>
                  <Slider
                    value={[eyeSize]}
                    onValueChange={([value]) => setEyeSize(value)}
                    max={30}
                    min={10}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Mouth Width</label>
                  <Slider
                    value={[mouthWidth]}
                    onValueChange={([value]) => setMouthWidth(value)}
                    max={60}
                    min={20}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={expression === "happy" ? "default" : "outline"}
                    onClick={() => setExpression("happy")}
                  >
                    Happy
                  </Button>
                  <Button
                    variant={expression === "sad" ? "default" : "outline"}
                    onClick={() => setExpression("sad")}
                  >
                    Sad
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="colors" className="space-y-4">
              <div>
                <label className="text-sm font-medium">Skin Color</label>
                <HexColorPicker color={skinColor} onChange={setSkinColor} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Card>
  );
}