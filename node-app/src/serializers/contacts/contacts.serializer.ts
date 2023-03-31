import {z} from "zod";

const contactReqSchema = z.object({
  full_name: z.string().min(10).max(255),
  phone: z.number().or(z.string()),
  email: z.string().email().min(8).max(127)
})

const contactResSchema = contactReqSchema.extend({
  id: z.string().uuid(),
  createdAt: z.date()
})

const contactListResSchema = contactResSchema.array()

const updateContactReqSchema = contactReqSchema.partial()

export { contactReqSchema, contactResSchema, contactListResSchema, updateContactReqSchema }