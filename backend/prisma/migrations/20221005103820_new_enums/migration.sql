-- CreateEnum
CREATE TYPE "projectTypeEnum" AS ENUM ('softwareSolution', 'hardwareAndSoftwareComplex', 'initiativeOfTheRegion', 'technology', 'service', 'notDefined', 'hardwareSolution');

-- CreateEnum
CREATE TYPE "projectStageEnum" AS ENUM ('ideaOrConcept', 'prototypeOrMVP', 'workingProduct', 'scaling');

-- CreateEnum
CREATE TYPE "projectMarketEnum" AS ENUM ('AeroNet', 'AeroNext', 'AutoNet', 'EcoNet', 'EduNet', 'EnergyNet', 'FoodNet', 'GameNet', 'HealthNet', 'HomeNet', 'Marinet', 'NeuroNet', 'SafeNet', 'SpaceNet', 'SportNet', 'TechNet', 'WearNet');

-- CreateEnum
CREATE TYPE "technologyTypeEnum" AS ENUM ('Prototyping3D', 'additiveTechnologies', 'bionics', 'hydrogenTechnologies', 'renewableMaterialsAndWasteRecycling', 'genobionics', 'geoinformationSystems', 'greenEnergy', 'artificialIntelligence', 'quantumTechnologies', 'collaborativeTechnologies', 'molecularEngineering', 'neurotechnologiesVirtualTechnologies', 'newProductionTechnologies', 'personalizedMedicine', 'powerPlants', 'syntheticBiology', 'wirelessCommunicationTechnologies', 'informationSecurityTechnologies', 'quantumCommunicationTechnologies', 'technologiesOfRoboticsAndMechatronics', 'machineLearningAndCognitiveTechnologies', 'technologiesOfModeling', 'distributedRegistryTechnologies', 'sensorTechnology', 'technologiesForCreatingNewAndPortableEnergySources', 'technologiesOfElectricPowerTransportation', 'technologiesForControllingBiologicalObjects', 'bigDataStorageAndAnalysisTechnologies', 'carbonFootprintManagement', 'photonics');

-- CreateEnum
CREATE TYPE "investmentStageEnum" AS ENUM ('ownInvestments', 'angels', 'preSeed', 'seed', 'stageA', 'stageB', 'stageC');

-- CreateEnum
CREATE TYPE "salesTypeEnum" AS ENUM ('noSales', 'firstSales', 'systemSales');

-- CreateEnum
CREATE TYPE "businessModelEnum" AS ENUM ('B2B', 'B2B2C', 'B2C', 'B2G', 'C2C', 'G2B', 'G2C');

-- CreateEnum
CREATE TYPE "mainGoalEnum" AS ENUM ('biometricsTasks', 'dataMiningTasks', 'computerVisionTasks', 'naturalLanguageProcessingTasks', 'humanSpeechProcessingTasks', 'tasksOfRecommendationSystems');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "filteringCategories" ADD VALUE 'IT';
ALTER TYPE "filteringCategories" ADD VALUE 'securityAndDefenseIndustry';
ALTER TYPE "filteringCategories" ADD VALUE 'geologyGeodesyAndMeteorology';
ALTER TYPE "filteringCategories" ADD VALUE 'stateAdministration';
ALTER TYPE "filteringCategories" ADD VALUE 'other';
ALTER TYPE "filteringCategories" ADD VALUE 'healthcareMedicinePharmaceuticals';
ALTER TYPE "filteringCategories" ADD VALUE 'healthyLifestyleAndSports';
ALTER TYPE "filteringCategories" ADD VALUE 'publicUtilities';
ALTER TYPE "filteringCategories" ADD VALUE 'creativeTechnologiesAndTheEntertainmentIndustry';
ALTER TYPE "filteringCategories" ADD VALUE 'cultureAndArt';
ALTER TYPE "filteringCategories" ADD VALUE 'forestry';
ALTER TYPE "filteringCategories" ADD VALUE 'mediaAndSocialNetworks';
ALTER TYPE "filteringCategories" ADD VALUE 'metallurgyAndMiningIndustry';
ALTER TYPE "filteringCategories" ADD VALUE 'theScience';
ALTER TYPE "filteringCategories" ADD VALUE 'realty';
ALTER TYPE "filteringCategories" ADD VALUE 'oilAndGasIndustry';
ALTER TYPE "filteringCategories" ADD VALUE 'catering';
ALTER TYPE "filteringCategories" ADD VALUE 'productionOfProducts';
ALTER TYPE "filteringCategories" ADD VALUE 'connection';
ALTER TYPE "filteringCategories" ADD VALUE 'agriculturalIndustry';
ALTER TYPE "filteringCategories" ADD VALUE 'constructionAndInfrastructure';
ALTER TYPE "filteringCategories" ADD VALUE 'tradeAndRetail';
ALTER TYPE "filteringCategories" ADD VALUE 'transport';
ALTER TYPE "filteringCategories" ADD VALUE 'tourismAndHotelBusiness';
ALTER TYPE "filteringCategories" ADD VALUE 'finance';
ALTER TYPE "filteringCategories" ADD VALUE 'chemicalIndustry';
ALTER TYPE "filteringCategories" ADD VALUE 'energy';

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "inn" TEXT,
ADD COLUMN     "mainContact" TEXT,
ADD COLUMN     "mainRegion" TEXT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "businessModel" "businessModelEnum",
ADD COLUMN     "investmentStage" "investmentStageEnum",
ADD COLUMN     "mainGoal" "mainGoalEnum",
ADD COLUMN     "projectMarket" "projectMarketEnum",
ADD COLUMN     "projectSite" TEXT,
ADD COLUMN     "projectStage" "projectStageEnum",
ADD COLUMN     "projectType" "projectTypeEnum",
ADD COLUMN     "salesType" "salesTypeEnum",
ADD COLUMN     "technologyType" "technologyTypeEnum";
