import { useState } from "react"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const articleSchema = z.object({
    title: z
        .string()
        .min(3, "Title must contain at least 3 characters")
        .max(50, "Title must contain maximum 50 characters"),
     content: z
        .string()
        .min(5, "Title must contain at least 5 characters")
        .max(225, "Title must contain maximum 255 characters"),
});
type ArticleFormData = z.infer<typeof articleSchema>;



export default function Formtest(){

    const [name, setName] = useState('yassine');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ArticleFormData>({
         resolver: zodResolver(articleSchema),
    });

    function chnage(){
        if(name =='yassine')
             setName('misso');
        else
            setName('yassine');
    }
    
     function submit(data: ArticleFormData) {
    console.log(data);
  }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <h1>Formtest</h1>

            <p>Name :{name}</p>

            <button  onClick={chnage}>change name</button>

            <input {...register("title")}
            />

             {errors.title && (
                <p style={{ color: "red" }}>
                    {errors.title.message}
                </p>
            )}
           

            <textarea {...register('content')} />
           
            {errors.content && (
                <p style={{ color: "red" }}>
                    {errors.content.message}
                </p>
            )}

            <button type="submit"> submit</button>
        </form>
    )

}