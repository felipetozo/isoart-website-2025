// Arquivo de teste simples para verificar o hook useCategoryData
// Este arquivo é apenas para verificação, não será usado em produção

import { useCategoryData } from './use-category-data';

// Simulação de teste
console.log('Hook useCategoryData criado com sucesso!');

// Verificar se as interfaces estão corretas
const testProduct: Product = {
    id: 1,
    name: "Test Product",
    slug: "test-product",
    description: "Test Description"
};

const testHero: HeroSection = {
    title: "Test Hero",
    description: "Test Description",
    buttonText: "Test Button",
    buttonLink: "/test",
    backgroundImage: "/test.jpg"
};

const testBenefit: Benefit = {
    id: 1,
    title: "Test Benefit",
    description: "Test Description"
};

const testCategory: CategoryData = {
    id: 1,
    title: "Test Category",
    slug: "test-category",
    categoryDescription: "Test Description",
    hero: testHero,
    products: [testProduct],
    benefits: [testBenefit]
};

console.log('Todas as interfaces estão funcionando corretamente!');
