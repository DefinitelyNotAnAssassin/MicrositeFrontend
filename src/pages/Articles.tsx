
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
export default function Articles(props) 


{ 




    return(

        <div className = "min-h-screen w-full flex flex-col gap-8 border border-black items-center">

            <h1 className="text-5xl font-semibold my-12">
                Articles 
            </h1>

            <div className = "h-3/4 w-3/4 flex sm:flex-col md:flex-row gap-8">
                {Array.from({ length: 3 }).map((_, index) => { 
                    return (
                        <Card key={index} className="p-2">
                            <CardHeader>
                                <CardTitle>Article Title</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </CardDescription>
                            </CardContent>
                            <CardFooter>
                                <button>Read More</button>
                            </CardFooter>
                        </Card>
                    )
                })}
                
                
            </div>
           
        </div>
           


      



    )



}