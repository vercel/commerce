Feature: Affichage des produits sur la page d'accueil

Scenario: Vérification de l'affichage des produits avec nom, image et prix
Given I am on the homepage
When the page is loaded
Then I should see a list of products
And each product should have an image
And each product should have a name
And each product should have a price
And the price should be displayed in EUR with two decimal points
