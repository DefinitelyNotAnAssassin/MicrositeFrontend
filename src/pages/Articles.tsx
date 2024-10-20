
import {
Card,
CardContent,
CardDescription,
CardFooter,
CardHeader,
CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button" 
import { motion } from "framer-motion" 


export default function Articles(props) 


{ 




    return(

        <section id="articles" className="py-20">
            <div className="container mx-auto px-4">
            <motion.h2 
                className="text-4xl font-bold mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Latest Articles
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {['The Future of AI', 'Cybersecurity Trends', 'Cloud Computing Advancements'].map((article, index) => (
                <motion.div
                    key={article}
                    initial={{ opacity: 0, y: 20 }}
                    animate={props.controls}
                    custom={index}
                    whileHover={{ y: -5 }}
                >
                    <Card className="h-full border-none shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold text-[#cc0000]">{article}</CardTitle>
                        <CardDescription>By BSIT Faculty</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">Explore the latest developments in {article.toLowerCase()} and their impact on the IT industry.</p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">Read More</Button>
                    </CardFooter>
                    </Card>
                </motion.div>
                ))}
            </div>
            </div>
        </section>
      



    )



}