CREATE TABLE [User] (
    [Id] int NOT NULL IDENTITY,
    [FullName] nvarchar(max) NULL,
	[FullLastName] nvarchar(max) NULL,
	[NameUser] varchar(100) NULL,
	[Email] varchar(100) NULL,
    [Password] int NOT NULL,
    CONSTRAINT [PK_User] PRIMARY KEY ([Id])
);

INSERT INTO [dbo].[User]
           ([FullName]
           ,[FullLastName]
           ,[NameUser]
           ,[Email]
           ,[Password])
VALUES      ('Hugo','Rojas','hugo','hugo.rojas@mtv.com',123),
			('Paco','Rojas','paco','paco.rojas@mtv.com',456),
			('Luis','Rojas','luis','luis.rojas@mtv.com',789)
GO

SELECT * FROM [User]