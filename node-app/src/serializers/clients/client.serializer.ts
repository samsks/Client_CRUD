import {z} from "zod";

const clientReqSchema = z.object({
  email: z.string().email().min(8).max(127),
  password: z.string().min(8).max(127),
  full_name: z.string().min(10).max(255),
  phone: z.number().or(z.string()),
})

const clientResSchema = clientReqSchema.extend({
  id: z.string(),
  isAdm: z.boolean(),
  createdAt: z.date(),
})
.omit({
  password: true
})

const clientListResSchema = clientResSchema.array()

const updateClientReqSchema = clientReqSchema.partial().omit({})

const sessionSchema = clientReqSchema.pick({email: true, password: true})
const sessionResSchema = z.object({token: z.string(), refresh: z.string()})

const refreshSchema = sessionResSchema.pick({refresh: true})
const refreshResSchema = sessionResSchema.pick({token: true})

export {clientReqSchema, clientResSchema, clientListResSchema, updateClientReqSchema, sessionSchema, sessionResSchema, refreshSchema, refreshResSchema}