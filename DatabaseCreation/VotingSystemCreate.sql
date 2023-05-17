Use master;
Go

CREATE DATABASE VotingSystemDB;
Go


USE VotingSystemDB;
GO

----- User
CREATE TABLE [dbo].[Users](
    [UserID] [int] IDENTITY(1,1) NOT NULL,
    [FirstName] [varchar](120) NULL,
    [LastName] [varchar](120) NULL,
	[Email][varchar](120) NULL,
	[Password][varchar](120) NULL,
	[IDNumber][int] NULL
);
GO

ALTER TABLE dbo.Users
ADD CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([UserID] ASC);
GO
---- Admins
CREATE TABLE [dbo].[Admins](
    [AdminID] [int] IDENTITY(1,1) NOT NULL,
    [FirstName] [varchar](120) NULL,
    [LastName] [varchar](120) NULL,
	[Email][varchar](120) NULL,
	[Password][varchar](120) NULL,
	[AdminLevel][int] NULL--fk
);
GO

ALTER TABLE dbo.Admins
ADD CONSTRAINT [PK_Admins] PRIMARY KEY CLUSTERED ([AdminID] ASC);
GO

-----AdminLevels
CREATE TABLE [dbo].[AdminLevel](
    [LevelID] [int] IDENTITY(1,1) NOT NULL,
    [LevelName] [varchar](120) NULL,
    [Description] [varchar](120) NULL,
);
GO

ALTER TABLE dbo.AdminLevel
ADD CONSTRAINT [PK_AdminLevel] PRIMARY KEY CLUSTERED ([LevelID] ASC);
GO

-----Voter Casts

CREATE TABLE [dbo].[VoterCasts](
    [CastID] [int] IDENTITY(1,1) NOT NULL,
	[UserID][int] NOT NULL,
	[PartyID][int] NOT NULL

);
GO

ALTER TABLE dbo.VoterCasts
ADD CONSTRAINT [PK_Votercasts] PRIMARY KEY CLUSTERED ([CastID] ASC);
GO

------Political Party
CREATE TABLE [dbo].[PoliticalParty](
    [PartyID] [int] IDENTITY(1,1) NOT NULL,
    [PartyName] [varchar](120) NULL,
    [PartyAbv] [varchar](120) NULL,
);
GO

ALTER TABLE dbo.PoliticalParty
ADD CONSTRAINT [PK_PoliticalParty] PRIMARY KEY CLUSTERED ([PartyID] ASC);
GO

------Party Results
CREATE TABLE [dbo].[PartyResults](
    [ResultID] [int] IDENTITY(1,1) NOT NULL,
	[PartyID][int] NOT NULL,
    [TotalTally] [int] NULL,
);
GO

ALTER TABLE dbo.PartyResults
ADD CONSTRAINT [PK_PartyResults] PRIMARY KEY CLUSTERED ([ResultID] ASC);
GO

---- Key figures
CREATE TABLE [dbo].[KeyFigures](
    [KeyFigureID] [int] IDENTITY(1,1) NOT NULL,
    [FirstName] [varchar](120) NULL,
    [LastName] [varchar](120) NULL,
	[PartyID][int] NOT NULL,
	[PartyLevel][int] NOT NULL
);
GO

ALTER TABLE dbo.KeyFigures
ADD CONSTRAINT [PK_KeyFigures] PRIMARY KEY CLUSTERED ([KeyFigureID] ASC);
GO

-----Party Levels
CREATE TABLE [dbo].[PartyLevels](
    [LevelID] [int] IDENTITY(1,1) NOT NULL,
    [Name] [varchar](120) NULL,
    [Description] [varchar](120) NULL

);
GO

ALTER TABLE dbo.PartyLevels
ADD CONSTRAINT [PK_PartyLevel] PRIMARY KEY CLUSTERED ([LevelID] ASC);
GO


------ Key Constraints
ALTER TABLE dbo.Admins
ADD CONSTRAINT [FK_AdminsAdminLevel] FOREIGN KEY  (AdminLevel) REFERENCES AdminLevel (LevelID);


ALTER TABLE dbo.VoterCasts
ADD CONSTRAINT [FK_VoterCastsUserID] FOREIGN KEY  (UserID) REFERENCES Users (UserID);

ALTER TABLE dbo.VoterCasts
ADD CONSTRAINT [FK_VoterCastsPartyID] FOREIGN KEY  (PartyID) REFERENCES PoliticalParty (PartyID); 

ALTER TABLE dbo.PartyResults
ADD CONSTRAINT [FK_PartyResultsPartyID] FOREIGN KEY  (PartyID) REFERENCES PoliticalParty (PartyID);

ALTER TABLE dbo.KeyFigures
ADD CONSTRAINT [FK_KeyFiguresPartyID] FOREIGN KEY  (PartyID) REFERENCES PoliticalParty (PartyID);

ALTER TABLE dbo.KeyFigures
ADD CONSTRAINT [FK_KeyFiguresPartyLevel] FOREIGN KEY  (PartyLevel) REFERENCES PartyLevels (LevelID);



