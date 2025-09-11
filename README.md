# Getting Started

**Note:** You will need a Prisma Postgres account. [Sign Up Here](https://console.prisma.io/sign-up?utm_source=website&utm_medium=index&utm_campaign=signup)

#### 1. Download this repository

```bash
git clone https://github.com/jonlumb/PrismaExample
cd PrismaExample
```

#### 2. Install the dependencies

```bash
npm install
```

#### 3. Initialise Prisma

```bash
npx prisma init --db --output ../app/generated/prisma
```

Follow through the prompts to create a Prisma Postgres database

#### 4. Create .env file

```bash
touch .env
```

Add your Prisma Postgres credentials to this file. You will need the correct key from your [Prisma Console](https://console.prisma.io), it can be found under the Connect to your Database section of the dashboard. Click the "Generate Secure Credentials" button, copy the string for .env, and paste that into your local .env file.

#### 5. Configure the Prisma Client Generator

```bash
npx prisma migrate dev --name init
```

#### 6. Seed the sample data

```bash
npx prisma db seed
```

#### 7. Run the Dev Server

```Bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
