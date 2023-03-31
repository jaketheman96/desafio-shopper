'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      {
        id: 1,
        name: 'AZEITE  PORTUGUÊS EXTRA VIRGEM GALLO 500ML',
        price: 20.49,
        qty_stock: 158
      },
      {
        id: 2,
        name: 'BEBIDA ENERGÉTICA VIBE 2L',
        price: 8.99,
        qty_stock: 659
      },
      {
        id: 3,
        name: 'ENERGÉTICO RED BULL ENERGY DRINK 250ML',
        price: 7.29,
        qty_stock: 909
      },
      {
        id: 4,
        name: 'ENERGÉTICO RED BULL ENERGY DRINK 355ML',
        price: 10.79,
        qty_stock: 159
      },
      {
        id: 5,
        name: 'ENERGÉTICO RED BULL ENERGY DRINK SEM AÇÚCAR 250ML',
        price: 7.49,
        qty_stock: 659
      },
      {
        id: 6,
        name: 'ÁGUA MINERAL BONAFONT SEM GÁS 1.5L',
        price: 2.39,
        qty_stock: 909
      },
      {
        id: 7,
        name: 'FILME DE PVC WYDA 28CMX15M',
        price: 3.99,
        qty_stock: 160
      },
      {
        id: 8,
        name: 'FILME DE PVC PRATSY 15M',
        price: 4.39,
        qty_stock: 410
      },
      {
        id: 9,
        name: 'ROLO DE PAPEL ALUMÍNIO WYDA 30CMX7.5M',
        price: 5.79,
        qty_stock: 660
      },
      {
        id: 10,
        name: 'ÁGUA MINERAL SEM GÁS MINALBA 1.5L',
        price: 2.29,
        qty_stock: 910
      },
      {
        id: 11,
        name: 'GUARDANAPO GRAND HOTEL SCOTT 24X24CM C/ 50UN',
        price: 4.39,
        qty_stock: 160
      },
      {
        id: 12,
        name: 'GUARDANAPO DIA A DIA SCOTT 24X22CM C/ 50UN',
        price: 2.59,
        qty_stock: 411
      },
      {
        id: 13,
        name: 'GUARDANAPO FOLHA DUPLA SNOB 23.5X23.5CM C/ 50UN',
        price: 4.25,
        qty_stock: 411
      },
      {
        id: 14,
        name: 'GUARDANAPO FOLHA SIMPLES SNOB 24X22CM C/ 50UN',
        price: 2.19,
        qty_stock: 661
      },
      {
        id: 15,
        name: 'PAPEL TOALHA SNOB C/ 2UN',
        price: 5.39,
        qty_stock: 912
      },
      {
        id: 16,
        name: 'TOALHA DE PAPEL SCOTT DURAMAX C/ 1UN',
        price: 11.29,
        qty_stock: 162
      },
      {
        id: 17,
        name: 'PRATO DESCARTÁVEL COPOBRAS 18CM',
        price: 1.99,
        qty_stock: 163
      },
      {
        id: 18,
        name: 'PRATO DESCARTÁVEL COPOBRAS 15CM',
        price: 2.09,
        qty_stock: 413
      },
      {
        id: 19,
        name: 'PRATO DESCARTÁVEL COPOBRAS 21CM',
        price: 3.79,
        qty_stock: 913
      },
      {
        id: 20,
        name: 'COLHER DESCARTÁVEL MASTER PRAFESTA BRANCA C/ 50UN',
        price: 5.99,
        qty_stock: 413
      },
      {
        id: 21,
        name: 'GARFO DESCARTÁVEL MASTER PRAFESTA CRYSTAL C/ 50UN',
        price: 7.49,
        qty_stock: 914
      },
      {
        id: 22,
        name: 'FACA DESCARTÁVEL MASTER PRAFESTA CRYSTAL C/ 50UN',
        price: 8.99,
        qty_stock: 164
      },
      {
        id: 23,
        name: 'SACO PARA LIXO DOVER ROLL SUPER FORTE AZUL 50L C/ 30UN',
        price: 42.9,
        qty_stock: 915
      },
      {
        id: 24,
        name: 'PANO PARA LIMPEZA PERFEX C/ 5UN',
        price: 6.99,
        qty_stock: 415
      },
      {
        id: 25,
        name: 'PANO PARA LIMPEZA ALKLIN C/ 5UN',
        price: 4.79,
        qty_stock: 665
      },
      {
        id: 26,
        name: 'VELA SANTA CRUZ BRANCA C/8 25G',
        price: 5.89,
        qty_stock: 915
      },
      {
        id: 27,
        name: 'VELA SANTA CRUZ C/8 30G',
        price: 6.89,
        qty_stock: 416
      },
      {
        id: 28,
        name: 'BEBIDA DE SOJA SOYOS SÚFRESH LARANJA E CENOURA 1L',
        price: 4.99,
        qty_stock: 666
      },
      {
        id: 29,
        name: 'BEBIDA A BASE DE SOJA ADES LARANJA 1L',
        price: 5.39,
        qty_stock: 916
      },
      {
        id: 30,
        name: 'BEBIDA A BASE DE SOJA ADES MAÇÃ 1L',
        price: 5.59,
        qty_stock: 166
      },
      {
        id: 31,
        name: 'BEBIDA À BASE DE SOJA ADES MAÇÃ ZERO 1L',
        price: 7.39,
        qty_stock: 416
      },
      {
        id: 32,
        name: 'BEBIDA À BASE DE SOJA ADES LARANJA ZERO 1L',
        price: 7.39,
        qty_stock: 667
      },
      {
        id: 33,
        name: 'CREME DE TRATAMENTO ELSEVE ULTRA LISO 300G',
        price: 16.99,
        qty_stock: 417
      },
      {
        id: 34,
        name: 'CREME DE TRATAMENTO ELSEVE OLÉO EXTRAORDINÁRIO 300G',
        price: 18.99,
        qty_stock: 667
      },
      {
        id: 35,
        name: 'DESODORANTE ROLL ON DOVE ORIGINAL 50ML',
        price: 10.49,
        qty_stock: 669
      },
      {
        id: 36,
        name: 'DESODORANTE ROLL ON DOVE SENSITIVE SEM PERFUME 50ML',
        price: 10.74,
        qty_stock: 919
      },
      {
        id: 37,
        name: 'DESODORANTE AEROSOL DOVE BEAUTY 150ML',
        price: 14.99,
        qty_stock: 169
      },
      {
        id: 38,
        name: 'DESODORANTE AEROSOL DOVE PURE 100G',
        price: 13.19,
        qty_stock: 419
      },
      {
        id: 39,
        name: 'REFRIGERANTE ANTARCTICA GUARANÁ 2L',
        price: 6.79,
        qty_stock: 670
      },
      {
        id: 40,
        name: 'ÁGUA MINERAL SEM GÁS CRYSTAL GARRAFÃO 5L',
        price: 7.99,
        qty_stock: 920
      },
      {
        id: 41,
        name: 'REFRIGERANTE H2OH! DE LIMÃO 500ML',
        price: 3.09,
        qty_stock: 670
      },
      {
        id: 42,
        name: 'DESODORANTE AEROSOL NIVEA SENSITIVE SEM PERFUME 150ML',
        price: 11.99,
        qty_stock: 171
      },
      {
        id: 43,
        name: 'REFRIGERANTE H2OH! LIMÃO 1.5L',
        price: 6.99,
        qty_stock: 921
      },
      {
        id: 44,
        name: 'DESODORANTE AEROSOL NIVEA BLACK&WHITE INVISIBLE MASCULINO 150ML',
        price: 11.99,
        qty_stock: 171
      },
      {
        id: 45,
        name: 'ÁGUA MINERAL PRATA SEM GÁS 1.5L',
        price: 3.09,
        qty_stock: 172
      },
      {
        id: 46,
        name: 'NÉCTAR MAGUARY DE MARACUJÁ 1L',
        price: 4.49,
        qty_stock: 672
      },
      {
        id: 47,
        name: 'REFRIGERANTE ANTARCTICA GUARANÁ ZERO 2L',
        price: 5.79,
        qty_stock: 923
      },
      {
        id: 48,
        name: 'ÁGUA MINERAL SEM GÁS CRYSTAL PET 1.5L',
        price: 2.59,
        qty_stock: 173
      },
      {
        id: 49,
        name: 'ÁGUA MINERAL BONAFONT SEM GÁS 500ML',
        price: 1.75,
        qty_stock: 423
      },
      {
        id: 50,
        name: 'DESODORANTE AEROSOL REXONA ANTIBACTERIANO + INVISIBLE PROTECTION FEMININO 150ML',
        price: 11.99,
        qty_stock: 673
      }
    ], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
