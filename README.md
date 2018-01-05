Nasz klient ma bardzo stare pliki z danymi o swoich klientach w dziwnym formacie. Prócz dziwnego formatu, problemem jest też to, że niektóre wpisy o klientach są zwyczajnie niepoprawne. Klient chce przenieść się na nową wersję programu do zarządzania klientami, który oczekuje danych w innym formacie, więc trzeba napisać konwerter ze starego formatu na nowy. Przy okazji robienia tego, chcemy wyrzucić wszystkie niepoprawne wpisy.
Stary format
Każdy wpis składa się z maksymalnie trzech pól: login, password i date
Pole z datą jest opcjonalne
Wartość danego pola jest po prawej stronie znaku = (<nazwa pola>=<wartosc>)
We wpisie, pola mogą pojawiać się w różnej kolejności
Wpisy są oddzielone przecinkiem
Wszystkie daty są w tym samym formacie
Przykład
login=marian12;password=jaromir1,date=2016-12-24;login=janusz422;password=mypassword772,login=witek33;password=mojehaslo23;date=2014-02-54,password=wincenty;login=asdad22;date=2017-12-12
Poprawność danych
Wpis jest poprawny kiedy:
Hasło jest niepuste i zawiera co najmniej jedną cyfrę
Login jest niepusty i zawiera co najmniej dwie cyfry
Został utworzony w 2016 roku lub później
Nowy format
Każdy wpis w nowej linii
Nie wypisujemy nazw pól a jedynie jego wartości po przecinkach w kolejności: login,hasło,data
Przykładowy wynik (dla inputu z powyższego przykładu starego formatu)
janusz422,mypassword772,2016-12-24



Wskazówka (spoiler alert!)
Zadanie od klienta - jak podzielić zadanie na mniejsze?

Mając złożone zadanie należy zacząć od przemyślenia w jaki sposób podzielić je na mniejsze części oraz przemyśleć, które części są zależne od siebie (które trzeba zrobić wcześniej od innych). Dzieląc sobie zadanie na podzadania / etapy, ważne żeby wiedzieć w pełni kiedy dany etap można uznać za poprawnie wykonany - czyli kiedy jasno wiemy co dostajemy na wstępie, co mamy wyprodukować i że skończyliśmy daną podfunkcjonalność.
O czym warto też pamiętać - tak jak wiele jest dróg na napisanie kodu tego samego zadania (ktoś użyje for'a, inny while'a, ktoś break'a, a ktoś inny wprowadzi dodatkową zmienną boolean'ową, itd. itd.) tak samo na różne sposoby można rozbić zadanie na mniejsze. Także nie ma co się sugerować tym, że jeśli ktoś zrobił to zadanie w inny sposób, to mój sposób pewnie jest zły.

No dobra, a teraz propozycja jak podzielić "Zadanie od klienta":
1. Funkcja, która przyjmuje cały nasz wejściowy string i wypluwa arraykę z poszczególnymi wpisami
np.
in: `'login=marian12;password=jaromir1,date=2016-12-24;login=janusz422;password=mypassword772'
out: `['login=marian12;password=jaromir1', 'date=2016-12-24;login=janusz422;password=mypassword772']`
2. Funkcja, która przyjmuje pojedynczy wpis (jako string) i wypluwa arraykę z pociętymi informacjami o wpisie
np.
in: `'date=2016-12-24;login=janusz422;password=mypassword772'`
out: `['date=2016-12-24', 'login=janusz422', 'password=mypassword772']`
3. Funkcja, która dostając arraykę z pociętymi informacjami o pojedynczym wpisie, wypluwa nam wartość dla konkretnego pola
np.
in: `['date=2016-12-24', 'login=janusz422', 'password=mypassword772']` oraz `login`
out: `janusz422`
4. Funkcja, która sprawdza sprawdza poprawność loginu (zwraca true/false)
5. Funkcja, która sprawdza sprawdza poprawność daty (zwraca true/false)
6. Funkcja, która sprawdza sprawdza poprawność hasła (zwraca true/false)
7. Funkcja, która przyjmuje `login, password, date` i zwraca stworzony z nich string w nowym formacie

No i przyda się wreszcie funkcja (bądź funkcje, up to you), które w odpowiedniej kolejności i w odpowiedni sposób będą kolejno wywoływać tamte funkcje pomocnicze i wyprodukują nam oczekiwany wynik.

Po napisaniu każdej funkcji należy przzetestować ją niezależnie od innych. Dlatego należy koniecznie wywołać ją samą z kilkoma różnymi parametrami i sprawdzić czy zwraca nam poprawny wynik. Na przykład po napisaniu funkcji sprawdzającej login (załóżmy `validateLogin(login)`) należy ją sprawdzić czy dla kilku przykładowych poprawnych parametrów zwróci true a dla niepoprawnych false. Np.
```
console.log(validateLogin('janusz422');  // powinno dać true
console.log(validateLogin('jan2usz4');  // powinno dać true
console.log(validateLogin('janusz4');  // powinno dać false
console.log(validateLogin('wincenty');  // powinno dać false
```
Jeśli przechodzi nam wszystkie nasze testy to ufamy, że działa dobrze. A jeśli nie to dzięki takiemu testowaniu każdej funkcji z osobna od razu wiemy gdzie konkretnie szukać błędu, a nie musimy przekopywać całego programu.

Good luck!
