/**
 * Site alvo: https://www.situacao-cadastral.com/
 * Objetivo: tirar print do resultado da consulta
 * 
 * gerador de cpf: 4devs.com.br
 * 
 * Utiliza o puppeteer - npm i puppeteer
 */

 const puppeteer = require('puppeteer');
 let cpfSearch = '085.008.529-25';

 /**
  * Responsável por realizar a consulta automatizada do CPF
  */
 const searchCpf = async (cpf) => {
   /**
    * Permite carregar alguns parâmetros do navegador
    */
   const browser = await puppeteer.launch({
     /**
      * Seta o browser aberto de forma oculta
      */
     headless:false
   });

   const page = await browser.newPage();
   /**
    * Acessando site alvo
    */
   await page.goto('https://www.situacao-cadastral.com/');
   /**
    * Comando abaixo só é executado se determinados componentes forem apresentados
    */
   await page.waitFor('input[name="doc"]');
   /**
    * Inserir informação em determinado campo do site
    * Delay utilizado para atrasar a inserção
    */
   await page.type('input[name="doc"]', cpf, {delay:230});
   /**
    * Responsável pela ação de teclar Enter
    */
   await page.keyboard.press('Enter');
   /**
    * Comando abaixo só é executado se determinados componentes forem apresentados
    */
   await page.waitFor('#corpo > tbody > tr:nth-child(2) > td > span > a');
   /**
    * Retira o print de uma determinada página
    */
   await page.screenshot({path: `consultaCPF-${cpf}.png`})
   /**
    * Função que realiza o fechamento do browser
    */
   await browser.close();
 };

 /**
  * Chamada da função
  */
 searchCpf(cpfSearch);

