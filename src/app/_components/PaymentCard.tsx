"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface PaymentProps {
  clerkUserId: string;
}

const PaymentCard: React.FC<PaymentProps> = ({ clerkUserId }) => {
  
  console.log(clerkUserId);
  
  return (
    <>
      <Card className="w-full mt-2">
        <CardHeader>
          <CardTitle>Payments</CardTitle>
          <CardDescription>
            Next Payment on: 15th Dec 2024
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Amount to be paid: <span>1500</span></Label>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">View Past Payments</Button>
          <Button>Pay now</Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default PaymentCard;