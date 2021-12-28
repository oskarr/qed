# QED
Statiskt hostade quiz. Tänkt för självstudier. Ej färdigt.

## Användning
Kompilera allt med `npm run build`. Redigera sedan filerna i `quiz`-mappen. De finns sedan på `[url till appen]/#/quiz/id`, där `id` är namnet på json-filen, t.ex. `1` för `1.json`. Detta kommer att ändras framöver, men det får duga just nu.

## Arkitektur
Den nuvarande kodarkitekturen är inte särskilt genomtänkt. Följande kommer att ändras:
* Quiz-viewen kommer att ta två argument (router-parametrar), dels quiz-id:t, och dels frågeindexet.
* Question-komponenten kommer att antingen delas in i delkomponenter, eller separata komponenter.
 - Navigationsmenyn längst ner bör eventuellt vara en egen komponent, som använder events för att kontrollera Quiz-komponenten.
* Vi behöver en huvudmenysida.