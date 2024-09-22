import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "./db"
import bcrypt from "bcrypt"


export const authOptions = {
    providers : [
        CredentialsProvider({
            name:"credentials",
            credentials:{
                phone : {label:"Phone"},
                password : {label:"Password",type:"password"}
            },
            async authorize(credentials) {
                if(!credentials){
                    return null
                }
                
                try{
                    console.log("hello2");
                    
                    const existingUser = await prisma.user.findFirst({where:{phone:credentials?.phone}})
                    console.log("hello4");
                    
                    if(!existingUser){
                        throw new Error("User does not exist")
                    }
                    
                    
                    const res = await bcrypt.compare(credentials.password,existingUser.password)

                    
                    if(!res){
                        console.log("hello5");
                        throw new Error("Invalid Password")
                    }
                    
                    
                    return {
                        id: existingUser.id,
                        image:existingUser.image,
                        name : existingUser.name,
                    }
                }catch(err:any){                    
                    throw new Error(err.message)
                }
            },
        })
    ],
    secret:process.env.NEXTAUTH_SECRET
    ,callbacks: {
        jwt: async ({ session, token }: any) => {
        if (session) {
            token.uid = session.id;
        }
        console.log(session);
        

        return token;
        },
      session: ({ session, token, user }: any) => {
          if (session.user) {
              session.user.id = token.sub
          }
          return session
      }
    },
    pages:{
        signIn: "/login"
    }
}