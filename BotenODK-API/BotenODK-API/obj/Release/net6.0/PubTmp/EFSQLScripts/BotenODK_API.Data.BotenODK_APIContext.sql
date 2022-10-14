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

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220429093243_Initial')
BEGIN
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
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220429093243_Initial')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220429093243_Initial', N'6.0.4');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220504141545_feedQueue')
BEGIN
    CREATE TABLE [FeedQueue] (
        [Id] int NOT NULL IDENTITY,
        [Filepath] nvarchar(max) NULL,
        [Timestamp] datetime2 NOT NULL,
        [Status] int NOT NULL,
        [Deleted] bit NOT NULL,
        [Feed] int NOT NULL,
        CONSTRAINT [PK_FeedQueue] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220504141545_feedQueue')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220504141545_feedQueue', N'6.0.4');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220509113321_ObjectDetection')
BEGIN
    CREATE TABLE [Livefeed] (
        [Id] int NOT NULL IDENTITY,
        [Name] nvarchar(max) NULL,
        [MaxDuration] nvarchar(max) NULL,
        [Filepath] nvarchar(max) NULL,
        CONSTRAINT [PK_Livefeed] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220509113321_ObjectDetection')
BEGIN
    CREATE TABLE [Object] (
        [Id] int NOT NULL IDENTITY,
        [Name] nvarchar(max) NULL,
        [SensityMovement] float NOT NULL,
        [LivefeedId] int NOT NULL,
        CONSTRAINT [PK_Object] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Object_Livefeed_LivefeedId] FOREIGN KEY ([LivefeedId]) REFERENCES [Livefeed] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220509113321_ObjectDetection')
BEGIN
    CREATE INDEX [IX_Object_LivefeedId] ON [Object] ([LivefeedId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220509113321_ObjectDetection')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220509113321_ObjectDetection', N'6.0.4');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220530115733_AddedFieldtoUser')
BEGIN
    ALTER TABLE [Object] DROP CONSTRAINT [FK_Object_Livefeed_LivefeedId];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220530115733_AddedFieldtoUser')
BEGIN
    ALTER TABLE [Object] DROP CONSTRAINT [PK_Object];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220530115733_AddedFieldtoUser')
BEGIN
    EXEC sp_rename N'[Object]', N'ObjectDetection';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220530115733_AddedFieldtoUser')
BEGIN
    EXEC sp_rename N'[ObjectDetection].[IX_Object_LivefeedId]', N'IX_ObjectDetection_LivefeedId', N'INDEX';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220530115733_AddedFieldtoUser')
BEGIN
    ALTER TABLE [User] ADD [AuthToken] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220530115733_AddedFieldtoUser')
BEGIN
    ALTER TABLE [ObjectDetection] ADD CONSTRAINT [PK_ObjectDetection] PRIMARY KEY ([Id]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220530115733_AddedFieldtoUser')
BEGIN
    CREATE TABLE [DataModel] (
        [Id] int NOT NULL IDENTITY,
        [Name] nvarchar(max) NULL,
        [COCOKey] nvarchar(max) NULL,
        CONSTRAINT [PK_DataModel] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220530115733_AddedFieldtoUser')
BEGIN
    CREATE TABLE [DetectedData] (
        [Id] int NOT NULL IDENTITY,
        [Timestamp] datetime2 NOT NULL,
        [Description] nvarchar(max) NULL,
        [State] int NOT NULL,
        [DataModelId] int NOT NULL,
        CONSTRAINT [PK_DetectedData] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_DetectedData_DataModel_DataModelId] FOREIGN KEY ([DataModelId]) REFERENCES [DataModel] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220530115733_AddedFieldtoUser')
BEGIN
    CREATE INDEX [IX_DetectedData_DataModelId] ON [DetectedData] ([DataModelId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220530115733_AddedFieldtoUser')
BEGIN
    ALTER TABLE [ObjectDetection] ADD CONSTRAINT [FK_ObjectDetection_Livefeed_LivefeedId] FOREIGN KEY ([LivefeedId]) REFERENCES [Livefeed] ([Id]) ON DELETE CASCADE;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220530115733_AddedFieldtoUser')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220530115733_AddedFieldtoUser', N'6.0.4');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220603121833_alteredUsermodel')
BEGIN
    ALTER TABLE [User] ADD [checksum] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220603121833_alteredUsermodel')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220603121833_alteredUsermodel', N'6.0.4');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220613075619_AlteredLivefeedsObjects')
BEGIN
    DROP TABLE [ObjectDetection];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220613075619_AlteredLivefeedsObjects')
BEGIN
    EXEC sp_rename N'[Livefeed].[MaxDuration]', N'URL', N'COLUMN';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220613075619_AlteredLivefeedsObjects')
BEGIN
    EXEC sp_rename N'[Livefeed].[Filepath]', N'Description', N'COLUMN';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220613075619_AlteredLivefeedsObjects')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220613075619_AlteredLivefeedsObjects', N'6.0.4');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220613085530_LiveFeeds')
BEGIN
    ALTER TABLE [Livefeed] ADD [Enabled] bit NOT NULL DEFAULT CAST(0 AS bit);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220613085530_LiveFeeds')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220613085530_LiveFeeds', N'6.0.4');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220613190400_AlerdChanges')
BEGIN
    ALTER TABLE [DetectedData] DROP CONSTRAINT [FK_DetectedData_DataModel_DataModelId];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220613190400_AlerdChanges')
BEGIN
    DROP INDEX [IX_DetectedData_DataModelId] ON [DetectedData];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220613190400_AlerdChanges')
BEGIN
    DECLARE @var0 sysname;
    SELECT @var0 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DetectedData]') AND [c].[name] = N'DataModelId');
    IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [DetectedData] DROP CONSTRAINT [' + @var0 + '];');
    ALTER TABLE [DetectedData] DROP COLUMN [DataModelId];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220613190400_AlerdChanges')
BEGIN
    DECLARE @var1 sysname;
    SELECT @var1 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[DetectedData]') AND [c].[name] = N'State');
    IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [DetectedData] DROP CONSTRAINT [' + @var1 + '];');
    ALTER TABLE [DetectedData] DROP COLUMN [State];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220613190400_AlerdChanges')
BEGIN
    ALTER TABLE [DetectedData] ADD [COCOKey] int NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220613190400_AlerdChanges')
BEGIN
    ALTER TABLE [DataModel] ADD [Description] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220613190400_AlerdChanges')
BEGIN
    ALTER TABLE [DataModel] ADD [Enabled] bit NOT NULL DEFAULT CAST(0 AS bit);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220613190400_AlerdChanges')
BEGIN
    CREATE INDEX [IX_DetectedData_COCOKey] ON [DetectedData] ([COCOKey]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220613190400_AlerdChanges')
BEGIN
    ALTER TABLE [DetectedData] ADD CONSTRAINT [FK_DetectedData_DataModel_COCOKey] FOREIGN KEY ([COCOKey]) REFERENCES [DataModel] ([Id]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220613190400_AlerdChanges')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220613190400_AlerdChanges', N'6.0.4');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220613191247_fixesRelation')
BEGIN
    ALTER TABLE [DetectedData] DROP CONSTRAINT [FK_DetectedData_DataModel_COCOKey];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220613191247_fixesRelation')
BEGIN
    EXEC sp_rename N'[DetectedData].[COCOKey]', N'DataModelId', N'COLUMN';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220613191247_fixesRelation')
BEGIN
    EXEC sp_rename N'[DetectedData].[IX_DetectedData_COCOKey]', N'IX_DetectedData_DataModelId', N'INDEX';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220613191247_fixesRelation')
BEGIN
    ALTER TABLE [DetectedData] ADD CONSTRAINT [FK_DetectedData_DataModel_DataModelId] FOREIGN KEY ([DataModelId]) REFERENCES [DataModel] ([Id]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220613191247_fixesRelation')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220613191247_fixesRelation', N'6.0.4');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220613191819_fixesRelation2')
BEGIN
    EXEC sp_rename N'[DataModel].[Id]', N'DataModelId', N'COLUMN';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220613191819_fixesRelation2')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220613191819_fixesRelation2', N'6.0.4');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220626152819_addFeedId')
BEGIN
    ALTER TABLE [DetectedData] DROP CONSTRAINT [FK_DetectedData_DataModel_DataModelId];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220626152819_addFeedId')
BEGIN
    DROP INDEX [IX_DetectedData_DataModelId] ON [DetectedData];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220626152819_addFeedId')
BEGIN
    ALTER TABLE [DetectedData] ADD [FeedId] int NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220626152819_addFeedId')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220626152819_addFeedId', N'6.0.4');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220830142431_AlteredUsers')
BEGIN
    DECLARE @var2 sysname;
    SELECT @var2 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[User]') AND [c].[name] = N'Role');
    IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [User] DROP CONSTRAINT [' + @var2 + '];');
    ALTER TABLE [User] ALTER COLUMN [Role] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220830142431_AlteredUsers')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220830142431_AlteredUsers', N'6.0.4');
END;
GO

COMMIT;
GO

