"use client"

import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function SearchForm() {
    return (
        <div className=" py-16 relative overflow-hidden min-h-[70vh] flex items-center">
            <div className="contact-bg-image absolute inset-0 opacity-20 min-h-72"></div>
            <Card className="w-1/3 max-w-3xl shadow-lg mr-auto relative overflow-hidden z-10">
                <CardHeader className="bg-blue-600 text-white p-4 rounded-t-lg">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                        <h2 className="text-lg font-semibold">Question Answer</h2>
                    </div>
                </CardHeader>
                <CardContent
                    className="p-8"
                    style={{
                        backgroundBlendMode: "overlay",
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center space-y-6"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="w-10 h-10 mx-auto bg-blue-600 rounded-xl flex items-center justify-center"
                        >
                            <Search className="w-7 h-7" />
                        </motion.div>

                        <div className="space-y-2">
                            <h1 className="text-xl font-bold text-gray-800">Search Question And Answer</h1>
                            {/* <p className="text-gray-600">Ahl-e-Sunnat-Pak</p> */}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-4"
                        >
                            <Input type="text" placeholder="Enter your question" className="w-full h-10 rounded-xl text-sm text-neutral-800" />
                            <Button className="w-1/3 bg-blue-600 hover:bg-blue-700 text-white h-10 py-2 text-sm rounded-xl">SEARCH NOW</Button>
                        </motion.div>
                    </motion.div>
                </CardContent>
            </Card>
        </div>
    )
}

