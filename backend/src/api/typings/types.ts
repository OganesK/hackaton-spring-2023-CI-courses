import { enumType } from 'nexus';

export const filteringCategoies = enumType({
  name: 'filteringCategoies',
  members: [
    'business',
    'development',
    'design',
    'management',
    'analytic',
    'education',
    'content',
    'IT',
  ],
});

export const projectType = enumType({
  name: 'projectType',
  members: [
    'softwareSolution',
    'hardwareAndSoftwareComplex',
    'initiativeOfTheRegion',
    'technology',
    'service',
    'notDefined',
    'hardwareSolution',
  ],
});

export const projectStage = enumType({
  name: 'projectStage',
  members: [
    'ideaOrConcept',
    'prototypeOrMVP',
    'workingProduct',
    'scaling',
  ],
});

export const projectMarket = enumType({
  name: 'projectMarket',
  members: [
    'AeroNet',
    'AeroNext',
    'AutoNet',
    'EcoNet',
    'EduNet',
    'EnergyNet',
    'FoodNet',
    'GameNet',
    'HealthNet',
    'HomeNet',
    'Marinet',
    'NeuroNet',
    'SafeNet',
    'SpaceNet',
    'SportNet',
    'TechNet',
    'WearNet',
  ],
});

export const technologyType = enumType({
  name: 'technologyType',
  members: [
    'Prototyping3D',
    'additiveTechnologies',
    'bionics',
    'hydrogenTechnologies',
    'renewableMaterialsAndWasteRecycling',
    'genobionics',
    'geoinformationSystems',
    'greenEnergy',
    'artificialIntelligence',
    'quantumTechnologies',
    'collaborativeTechnologies',
    'molecularEngineering',
    'neurotechnologiesVirtualTechnologies',
    'newProductionTechnologies',
    'personalizedMedicine',
    'powerPlants',
    'syntheticBiology',
    'wirelessCommunicationTechnologies',
    'informationSecurityTechnologies',
    'quantumCommunicationTechnologies',
    'technologiesOfRoboticsAndMechatronics',
    'machineLearningAndCognitiveTechnologies',
    'technologiesOfModeling',
    'distributedRegistryTechnologies',
    'sensorTechnology',
    'technologiesForCreatingNewAndPortableEnergySources',
    'technologiesOfElectricPowerTransportation',
    'technologiesForControllingBiologicalObjects',
    'bigDataStorageAndAnalysisTechnologies',
    'carbonFootprintManagement',
    'photonics',
  ],
});

export const investmentStage = enumType({
  name: 'investmentStage',
  members: [
    'ownInvestments',
    'angels',
    'preSeed',
    'seed',
    'stageA',
    'stageB',
    'stageC',
  ],
});

export const salesType = enumType({
  name: 'salesType',
  members: ['noSales',
    'firstSales',
    'systemSales'],
});

export const businessModel = enumType({
  name: 'businessModel',
  members: [
    'B2B',
    'B2B2C',
    'B2C',
    'B2G',
    'C2C',
    'G2B',
    'G2C',
  ],
});

export const mainGoal = enumType({
  name: 'mainGoal',
  members: [
    'biometricsTasks',
    'dataMiningTasks',
    'computerVisionTasks',
    'naturalLanguageProcessingTasks',
    'humanSpeechProcessingTasks',
    'tasksOfRecommendationSystems',
  ],
});

export const registeredVerdict = enumType({
  name: 'registeredVerdict',
  members: ['yes', 'maybe'],
});
