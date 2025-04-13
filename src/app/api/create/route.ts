import connect from "@/lib/dbConfig";
import sendEmail from "@/lib/mailer";
import { MessageModel } from "@/models/message.model";

export async function POST(request: Request) {
  connect();
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json(
        {
          success: false,
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    const msg = await MessageModel.create({
      name,
      email,
      message,
    });

    await sendEmail(name, message, email);

    return Response.json({
      success: true,
      message: "Message saved successfully",
      data: msg,
    });
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, error: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}