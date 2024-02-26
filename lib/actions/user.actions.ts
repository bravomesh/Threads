"use server"

import { string } from "zod";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import { revalidatePath } from "next/cache";

interface Params{
    userId: string, 
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string,
}
export async function updateUser({
    userId, 
    username,
    name,
    bio,
    image,
    path
}:Params):Promise<void>{
    connectToDB();
    try{
    await User.findOneAndUpdate(
        {id:userId},
        {
            username: username.toLowerCase(),
            name, 
            bio,
            image,
            onboared: true
        },
        {upsert: true}// update and inserting data
    )

    if(path === '/profile/edit'){
        revalidatePath(path); //revalidatePath is a next js function that revalidates data associated with a specific path 
    }
}
    catch(error: any){
        throw new Error(`failded to update/create user: ${error.message}`);
    }

}

export async function fetchUser(userId: string){
    try{
        connectToDB();
        return await User
            .findOne({id: userId})
            //.populate({path: "communitities", model: Community})
    }catch(err: any){
        throw new Error(`Failed to fetch user: ${err.message}`)
    }
}
