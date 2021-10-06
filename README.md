# Nestjs example, using Prisma and Sqlite

## start the project

    npm install
    npm run start:dev

## Notes

To create a new module folder, cd into the src/modules folder and run this

    nest g resource MODULE_NAME --no-spec

Prisma migrations

    npx prisma migrate dev --name MIGRATION_NAME
