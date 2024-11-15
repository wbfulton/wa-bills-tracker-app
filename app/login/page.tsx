import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "@/lib/auth";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            This demo uses GitHub for authentication.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            action={async () => {
              "use server";
              // .catch((err) => console.log(err));
              try {
                await signIn("github", {
                  redirectTo: "/",
                });
              } catch (error) {
                console.log(error);
              }
            }}
            className="w-full"
          >
            <Button className="w-full">Sign in with GitHub</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
