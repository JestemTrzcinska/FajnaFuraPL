
function start(){
    var zm; zm=new pokaz_slajdow();
    zm.dodaj_obraz('1.jpg'); //dodawanie obrazów
    zm.dodaj_obraz('2.jpg');
    zm.dodaj_obraz('3.jpg');
    
    zm.czas_wyswietl = 4000;
    zm.czasy_przejsc(1000, 25)
    zm.pokaz_slajdow('pokaz_slajdow');
    }
    