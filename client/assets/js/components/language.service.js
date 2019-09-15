(function() {

    'use strict';

    angular.module('application').
    service('langService', langService);

    langService.$inject = ['$rootScope', 'FoundationApi'];

    function langService($rootScope, FoundationApi) {

      const inline_help = {}
      inline_help.sum_insured = {}
      inline_help.deductable = {}
      inline_help.premium = {}
      inline_help.maximisation = {}
      inline_help.sublimit = {}
      inline_help.personal_damage = {}
      inline_help.property_damage = {}
      inline_help.financial_loss = {}
      inline_help.start_date = {}
      inline_help.next_renewal_date = {}

      inline_help.sum_insured.en = "The maximum amount the insurer will cover in case of a damage."
      inline_help.deductable.en = "Amount to be borne by the policyholder in the event of a claim."
      inline_help.premium.en = "Required annual fee including insurance tax."
      inline_help.maximisation.en = "Number of claims covered per year that reach the full sum insured."
      inline_help.sublimit.en = "The maximum amount the insurer will pay out in this specific case."
      inline_help.personal_damage.en = "Damage in the form of an injury, health damage or death of a person."
      inline_help.property_damage.en = "Property damage describes the damage or destruction of things such as vehicles, streets, buildings, things and other inanimate objects."
      inline_help.financial_loss.en = "Damages in the form of a financial loss to a person."
      inline_help.start_date.en = "Beginning of the insurance period specified in the insurance contract."
      inline_help.next_renewal_date.en = "The renewal date is the date on which an existing insurance contract has to be renewed."

      inline_help.sum_insured.de = "Der maximale Betrag, der im Schadensfall ausgezahlt wird."
      inline_help.deductable.de = "Betrag, den der Versicherungsnehmer im Versicherungsfall selbst zu tragen hat."
      inline_help.premium.de = "Jährlich zu leistende Beitragszahlung inklusive Versicherungssteuer."
      inline_help.maximisation.de = "Die Maximierung gibt an, für wie viele Schadensfälle die volle Versicherungssumme, innerhalb eines Jahres, zur Verfügung steht."
      inline_help.sublimit.de = "Obergrenze für spezifizierte Schadensfälle, die von der vereinbarten Deckungssumme abweicht. Man könnte das Sublimit auch als Deckungssumme für klar definierte Teilrisiken bezeichnen."
      inline_help.personal_damage.de = "Schaden an einer Person in Form einer Verletzung, Gesundheitsschädigung oder des Todes."
      inline_help.property_damage.de = "Ein Sachschaden ensteht bei der Beschädigung, Vernichtung oder Zerstörung von Sachen, wie z.B. Fahrzeugen, Straßen, Gebäuden, Gegenstände und sonstigen Dingen unbelebter Natur."
      inline_help.financial_loss.de = "Schaden am Vermögen einer Person. Ein Vermögensschaden lässt sich in unechten und echten Vermögensschaden einteilen je nachdem ob der Vermögensschaden in Abhängigkeit zu einem Personen- / Sachschaden entstanden ist oder unabhängig angefallen ist."
      inline_help.start_date.de = "Anfang der Laufzeit eines Versicherungsvertrags."
      inline_help.next_renewal_date.de = "Datum an dem der bestehende Versicherungsvertrag erneuert bzw. verlängert werden muss."

        /* Return Stuff */
        return {
          inline_help: inline_help
        }
    }
})();
