import JsonEditor from "@/components/json-editor";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export default  async function page() {

  const user = await currentUser();
  if (!user) {
    return redirect('/');
  }

  const loggedInUser = await prisma.user.findUnique({
    where: { clerkUserId: user.id },

  });
  if(!loggedInUser){
    await prisma.user.create({
      data:{
        clerkUserId:user.id,
        name:'${user.firstName} ${user.lastname}',
        imageUrl: user.imageUrl,
        email:user.emailAddresses[0].emailAddress
      }
    })
  }


  return (
    <div>
      <div className="my-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Efficiently manage your data and seamlessly share it with others for
          enhanced collaboration and productivity.
        </p>
      </div>
      <JsonEditor />
      </div>
      
  );
}
