export const useTranslateIndustrialDirections = (value: string) => {
  value === 'IT'
    ? (value = 'IT')
    : value === 'securityAndDefenseIndustry'
    ? (value = 'Безопасность и оборонная промышленность')
    : value === 'geologyGeodesyAndMeteorology'
    ? (value = 'Геология, геодезия и метеорология')
    : value === 'stateAdministration'
    ? (value = 'Гос. Управление')
    : value === 'other'
    ? (value = 'Другое')
    : value === 'healthcareMedicinePharmaceuticals'
    ? (value = 'Здравоохранение, медицина, фармацевтика')
    : value === 'healthyLifestyleAndSports'
    ? (value = 'ЗОЖ и спорт')
    : value === 'publicUtilities'
    ? (value = 'Коммунальное хозяйство')
    : value === 'creativeTechnologiesAndTheEntertainmentIndustry'
    ? (value = 'Креативные технологии и индустрия развлечений')
    : value === 'cultureAndArt'
    ? (value = 'Культура и искусство')
    : value === 'forestry'
    ? (value = 'Лесное хозяйство')
    : value === 'mediaAndSocialNetworks'
    ? (value = 'Медиа и соцсети')
    : value === 'metallurgyAndMiningIndustry'
    ? (value = 'Металлургия и добывающая промышленность')
    : value === 'theScience'
    ? (value = 'Наука')
    : value === 'realty'
    ? (value = 'Недвижимость')
    : value === 'oilAndGasIndustry'
    ? (value = 'Нефтегазовая отрасль')
    : value === 'catering'
    ? (value = 'Общепит')
    : value === 'productionOfProducts'
    ? (value = 'Производство продуктов')
    : value === 'connection'
    ? (value = 'Связь')
    : value === 'agriculturalIndustry'
    ? (value = 'Сельское хозяйство')
    : value === 'constructionAndInfrastructure'
    ? (value = 'Строительство и инфраструктура')
    : value === 'tradeAndRetail'
    ? (value = 'Торговля и ритейл')
    : value === 'transport'
    ? (value = 'Транспорт')
    : value === 'tourismAndHotelBusiness'
    ? (value = 'Туризм и гостиничный бизнес')
    : value === 'finance'
    ? (value = 'Финансы')
    : value === 'chemicalIndustry'
    ? (value = 'Химическая промышленность')
    : value === 'energy'
    ? (value = 'Энергетика')
    : value;

  return value;
};

export const useTranslateTypes = (value: string) => {
  value === 'softwareSolution'
    ? (value = 'Программное решение')
    : value === 'hardwareAndSoftwareComplex'
    ? (value = 'Программно-аппаратный комплекс')
    : value === 'initiativeOfTheRegion'
    ? (value = 'Инициатива региона')
    : value === 'technology'
    ? (value = 'Технология')
    : value === 'service'
    ? (value = 'Услуга')
    : value === 'notDefined'
    ? (value = 'Не определен')
    : value === 'hardwareSolution'
    ? (value = 'Аппаратное решение')
    : value;

  return value;
};

export const useTranslateStages = (value: string) => {
  value === 'ideaOrConcept'
    ? (value = 'Идея или концепция')
    : value === 'prototypeOrMVP'
    ? (value = 'Прототип или MVP')
    : value === 'workingProduct'
    ? (value = 'Работающий продукт')
    : value === 'scaling'
    ? (value = 'Масштабирование')
    : value;

  return value;
};

export const useTranslateTechTypes = (value: string) => {
  value === 'Prototyping3D'
    ? (value = '3Д прототипирование')
    : value === 'additiveTechnologies'
    ? (value = 'Аддитивные технологии')
    : value === 'bionics'
    ? (value = 'Бионика')
    : value === 'hydrogenTechnologies'
    ? (value = 'Водородные технологии')
    : value === 'renewableMaterialsAndWasteRecycling'
    ? (value = 'Возобновляемые материалы и переработка отходов')
    : value === 'genobionics'
    ? (value = 'Генобионика')
    : value === 'geoinformationSystems'
    ? (value = 'Геоинформационные системы')
    : value === 'greenEnergy'
    ? (value = 'Зеленая энергетика')
    : value === 'artificialIntelligence'
    ? (value = 'Искусственный интеллект')
    : value === 'quantumTechnologies'
    ? (value = 'Квантовые технологии')
    : value === 'collaborativeTechnologies'
    ? (value = 'Коллаборативные технологии')
    : value === 'molecularEngineering'
    ? (value = 'Молекулярный инжиниринг')
    : value === 'neurotechnologiesVirtualTechnologies'
    ? (value = 'Нейротехнологии, технологии виртуальной и дополненной реальностей')
    : value === 'newProductionTechnologies'
    ? (value = 'Новые производственные технологии')
    : value === 'personalizedMedicine'
    ? (value = 'Персонифицированная медицина')
    : value === 'powerPlants'
    ? (value = 'Силовые установки')
    : value === 'syntheticBiology'
    ? (value = 'Синтетическая биология')
    : value === 'wirelessCommunicationTechnologies'
    ? (value = 'Технологии беспроводной связи и «интернета вещей»')
    : value === 'informationSecurityTechnologies'
    ? (value = 'Технологии информационной безопасности')
    : value === 'quantumCommunicationTechnologies'
    ? (value = 'Технологии квантовой коммуникации')
    : value === 'technologiesOfRoboticsAndMechatronics'
    ? (value = 'Технологии компонентов робототехники и мехатроники')
    : value === 'machineLearningAndCognitiveTechnologies'
    ? (value = 'Технологии машинного обучения и когнитивные технологии')
    : value === 'technologiesOfModeling'
    ? (value = 'Технологии моделирования и разработки материалов с заданными свойствами')
    : value === 'distributedRegistryTechnologies'
    ? (value = 'Технологии распределенных реестров')
    : value === 'sensorTechnology'
    ? (value = 'Технологии сенсорики')
    : value === 'technologiesForCreatingNewAndPortableEnergySources'
    ? (value = 'Технологии создания новых и портативных источников энергии')
    : value === 'technologiesOfElectricPowerTransportation'
    ? (value = 'Технологии транспортировки электроэнергии и распределённых интеллектуальных энергосистем')
    : value === 'technologiesForControllingBiologicalObjects'
    ? (value = 'Технологии управления свойствами биологических объектов')
    : value === 'bigDataStorageAndAnalysisTechnologies'
    ? (value = 'Технологии хранения и анализа больших данных')
    : value === 'carbonFootprintManagement'
    ? (value = 'Управление углеродным следом')
    : value === 'photonics'
    ? (value = 'Фотоника')
    : value;

  return value;
};

export const useTranslateInvestmentsStages = (value: string) => {
  value === 'governmentSubsidies'
    ? (value = 'Государственные субсидии')
    : value === 'ownInvestments'
    ? (value = 'Собственные инвестиции')
    : value === 'angels'
    ? (value = 'Angels')
    : value === 'preSeed'
    ? (value = 'PreSeed')
    : value === 'seed'
    ? (value = 'Seed')
    : value === 'stageA'
    ? (value = 'Stage A')
    : value === 'stageB'
    ? (value = 'Stage B')
    : value === 'stageC'
    ? (value = 'Stage C')
    : value;

  return value;
};

export const useTranslateSalesTypes = (value: string) => {
  value === 'noSales'
    ? (value = 'Нет продаж')
    : value === 'firstSales'
    ? (value = 'Первые продажи')
    : value === 'systemSales'
    ? (value = 'Системные продажи')
    : value;

  return value;
};

export const useTranslateMainGoals = (value: string) => {
  value === 'biometricsTasks'
    ? (value = 'Задачи биометрии')
    : value === 'dataMiningTasks'
    ? (value = 'Задачи интеллектуального анализа данных')
    : value === 'computerVisionTasks'
    ? (value = 'Задачи компьютерного зрения')
    : value === 'naturalLanguageProcessingTasks'
    ? (value = 'Задачи обработки естественного языка (NLP)')
    : value === 'humanSpeechProcessingTasks'
    ? (value = 'Задачи обработки человеческой речи')
    : value === 'tasksOfRecommendationSystems'
    ? (value = 'Задачи рекомендательных систем')
    : value;

  return value;
};
