import { pgTable, serial, text, timestamp, varchar, integer, boolean, decimal, jsonb, index, unique } from 'drizzle-orm/pg-core'

// ============ Core Tables ============

export const universities = pgTable('universities', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  category: varchar('category', { length: 100 }), // Type of university (e.g., Public, Private, Medical, Engineering)
  config: jsonb('config'), // Dynamic configuration for customization
  is_active: boolean('is_active').default(true),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow()
})

export const colleges = pgTable('colleges', {
  id: serial('id').primaryKey(),
  university_id: integer('university_id').notNull().references(() => universities.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  code: varchar('code', { length: 100 }).unique(),
  address: text('address'),
  config: jsonb('config'), // Dynamic configuration
  is_active: boolean('is_active').default(true),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow()
}, (table) => {
  return {
    universityIdx: index('college_university_idx').on(table.university_id)
  }
})

// ============ User Management ============

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  password_hash: text('password_hash'), // For credentials-based auth
  name: text('name'),
  phone: varchar('phone', { length: 20 }),
  role: varchar('role', { length: 50 }).notNull(), // superadmin | admin | staff | student
  is_active: boolean('is_active').default(true),
  email_verified: timestamp('email_verified'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow()
}, (table) => {
  return {
    emailIdx: index('user_email_idx').on(table.email),
    roleIdx: index('user_role_idx').on(table.role)
  }
})

// University admins (heads)
export const university_admins = pgTable('university_admins', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  university_id: integer('university_id').notNull().references(() => universities.id, { onDelete: 'cascade' }),
  designation: varchar('designation', { length: 100 }),
  created_at: timestamp('created_at').defaultNow()
}, (table) => {
  return {
    userUniversityUnique: unique('user_university_unique').on(table.user_id, table.university_id)
  }
})

// College staff
export const staff = pgTable('staff', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  college_id: integer('college_id').notNull().references(() => colleges.id, { onDelete: 'cascade' }),
  designation: varchar('designation', { length: 100 }),
  department: varchar('department', { length: 100 }),
  created_at: timestamp('created_at').defaultNow()
})

export const students = pgTable('students', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  college_id: integer('college_id').notNull().references(() => colleges.id, { onDelete: 'cascade' }),
  enrollment_no: varchar('enrollment_no', { length: 100 }).unique(),
  admission_year: integer('admission_year'),
  current_semester: integer('current_semester'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow()
}, (table) => {
  return {
    collegeIdx: index('student_college_idx').on(table.college_id)
  }
})

// ============ Academic Structure ============

export const curricula = pgTable('curricula', {
  id: serial('id').primaryKey(),
  college_id: integer('college_id').notNull().references(() => colleges.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  code: varchar('code', { length: 100 }),
  duration_years: integer('duration_years'),
  total_semesters: integer('total_semesters'),
  config: jsonb('config'), // Dynamic structure
  is_active: boolean('is_active').default(true),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow()
})

export const subjects = pgTable('subjects', {
  id: serial('id').primaryKey(),
  curriculum_id: integer('curriculum_id').notNull().references(() => curricula.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  code: varchar('code', { length: 100 }),
  semester: integer('semester'),
  credits: integer('credits'),
  is_elective: boolean('is_elective').default(false),
  created_at: timestamp('created_at').defaultNow()
})

// ============ Forms System ============

export const form_templates = pgTable('form_templates', {
  id: serial('id').primaryKey(),
  college_id: integer('college_id').references(() => colleges.id, { onDelete: 'cascade' }),
  university_id: integer('university_id').references(() => universities.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // admission | examination | certificate | other
  fields_schema: jsonb('fields_schema').notNull(), // Dynamic form fields
  is_active: boolean('is_active').default(true),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow()
})

export const form_submissions = pgTable('form_submissions', {
  id: serial('id').primaryKey(),
  form_template_id: integer('form_template_id').notNull().references(() => form_templates.id),
  student_id: integer('student_id').notNull().references(() => students.id, { onDelete: 'cascade' }),
  data: jsonb('data').notNull(), // Form data
  status: varchar('status', { length: 50 }).notNull().default('pending'), // pending | approved | rejected
  submitted_at: timestamp('submitted_at').defaultNow(),
  reviewed_at: timestamp('reviewed_at'),
  reviewed_by: integer('reviewed_by').references(() => users.id)
})

// ============ Fee Management ============

export const fee_structures = pgTable('fee_structures', {
  id: serial('id').primaryKey(),
  college_id: integer('college_id').notNull().references(() => colleges.id, { onDelete: 'cascade' }),
  curriculum_id: integer('curriculum_id').references(() => curricula.id),
  name: text('name').notNull(),
  semester: integer('semester'),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  due_date: timestamp('due_date'),
  config: jsonb('config'), // Additional fee breakdown
  is_active: boolean('is_active').default(true),
  created_at: timestamp('created_at').defaultNow()
})

export const fee_payments = pgTable('fee_payments', {
  id: serial('id').primaryKey(),
  student_id: integer('student_id').notNull().references(() => students.id, { onDelete: 'cascade' }),
  fee_structure_id: integer('fee_structure_id').notNull().references(() => fee_structures.id),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  payment_method: varchar('payment_method', { length: 50 }), // online | cash | cheque
  transaction_id: varchar('transaction_id', { length: 255 }),
  status: varchar('status', { length: 50 }).notNull().default('pending'), // pending | completed | failed
  paid_at: timestamp('paid_at'),
  created_at: timestamp('created_at').defaultNow()
})

export const challans = pgTable('challans', {
  id: serial('id').primaryKey(),
  student_id: integer('student_id').notNull().references(() => students.id, { onDelete: 'cascade' }),
  challan_number: varchar('challan_number', { length: 100 }).notNull().unique(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  purpose: text('purpose'),
  due_date: timestamp('due_date'),
  status: varchar('status', { length: 50 }).notNull().default('unpaid'), // unpaid | paid | expired
  paid_at: timestamp('paid_at'),
  created_at: timestamp('created_at').defaultNow()
})

// ============ Note on Relations ============
// Foreign keys are defined above using .references() 
// Drizzle ORM will infer relationships automatically for joins and queries
// You can query related data using the db query API without explicit relation definitions
