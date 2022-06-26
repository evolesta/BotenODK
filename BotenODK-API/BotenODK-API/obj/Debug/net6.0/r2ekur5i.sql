IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [User] (
    [Id] int NOT NULL IDENTITY,
    [FirstName] nvarchar(max) NULL,
    [LastName] nvarchar(max) NULL,
    [Username] nvarchar(max) NULL,
    [Password] nvarchar(max) NULL,
    [Email] nvarchar(max) NULL,
    [Role] int NOT NULL,
    CONSTRAINT [PK_User] PRIMARY KEY ([Id])
);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220429093243_Initial', N'6.0.4');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [FeedQueue] (
    [Id] int NOT NULL IDENTITY,
    [Filepath] nvarchar(max) NULL,
    [Timestamp] datetime2 NOT NULL,
    [Status] int NOT NULL,
    [Deleted] bit NOT NULL,
    [Feed] int NOT NULL,
    CONSTRAINT [PK_FeedQueue] PRIMARY KEY ([Id])
);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220504141545_feedQueue', N'6.0.4');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Livefeed] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NULL,
    [MaxDuration] nvarchar(max) NULL,
    [Filepath] nvarchar(max) NULL,
    CONSTRAINT [PK_Livefeed] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Object] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NULL,
    [SensityMovement] float NOT NULL,
    [LivefeedId] int NOT NULL,
    CONSTRAINT [PK_Object] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Object_Livefeed_LivefeedId] FOREIGN KEY ([LivefeedId]) REFERENCES [Livefeed] ([Id]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_Object_LivefeedId] ON [Object] ([LivefeedId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220509113321_ObjectDetection', N'6.0.4');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [Object] DROP CONSTRAINT [FK_Object_Livefeed_LivefeedId];
GO

ALTER TABLE [Object] DROP CONSTRAINT [PK_Object];
GO

EXEC sp_rename N'[Object]', N'ObjectDetection';
GO

EXEC sp_rename N'[ObjectDetection].[IX_Object_LivefeedId]', N'IX_ObjectDetection_LivefeedId', N'INDEX';
GO

ALTER TABLE [User] ADD [AuthToken] nvarchar(max) NULL;
GO

ALTER TABLE [ObjectDetection] ADD CONSTRAINT [PK_ObjectDetection] PRIMARY KEY ([Id]);
GO

CREATE TABLE [DataModel] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NULL,
    [COCOKey] nvarchar(max) NULL,
    CONSTRAINT [PK_DataModel] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [DetectedData] (
    [Id] int NOT NULL IDENTITY,
    [Timestamp] datetime2 NOT NULL,
    [Description] nvarchar(max) NULL,
    [State] int NOT NULL,
    [DataModelId] int NOT NULL,
    CONSTRAINT [PK_DetectedData] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_DetectedData_DataModel_DataModelId] FOREIGN KEY ([DataModelId]) REFERENCES [DataModel] ([Id]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_DetectedData_DataModelId] ON [DetectedData] ([DataModelId]);
GO

ALTER TABLE [ObjectDetection] ADD CONSTRAINT [FK_ObjectDetection_Livefeed_LivefeedId] FOREIGN KEY ([LivefeedId]) REFERENCES [Livefeed] ([Id]) ON DELETE CASCADE;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220530115733_AddedFieldtoUser', N'6.0.4');
GO

COMMIT;
GO

