# QED
Markdown-dokument med quiz. Tänkt för sammanfattningar, etc. Work-in-progress.

## Användning
Kompilera allt med `npm run build`. Redigera sedan filerna i `doc`-mappen. De finns sedan på `[url till appen]/#/docs/id`, där `id` är namnet på json-filen, t.ex. `1` för `1.md`. Detta kommer att ändras framöver, men det får duga just nu.

## Övergripande struktur
I mappen `@/views` (dvs. `src/views`) finns en komponent som heter `Document.tsx`. Denna laddar in en MarkDown-fil, separerar ut quizzen, och använder sedan `Quiz.tsx` i samma mapp för att rendera Quiz:en. Jag har ännu inte bestämt om `Quiz.tsx` ska vara fristående eller om den bör flyttas till `@/components`. I `@/components` finns dels en komponent som används för att byta mellan frågor, och dels en `Question`-komponent, som egentligen bara ser till att rätt fråga hanteras av rätt handler-komponent i `@/components/question`.

## Att göra
* Fixa numerisk input
* Lägg till ett "svarsbeskrivnings-fält" för frågor
* Fixa ett system för att ha med grafer
* Rensa upp
* Ge en visuell hint om när det går att gå till nästa fråga och inte
* Fixa swipes

## Formatet
Formatet är i princip helt baserat på MarkDown. Quiz sätts in genom att använda kodblock, med språket `qed-toml` eller `qed-json`, beroende på vilket format som används. I detta block måste dels en `title` specificeras, tillsammans med ett antal `questions` i listan med samma namn. Det finns olika sorters frågor. Nedan visas ett exempel i toml-format.
```toml
title = "Quizzets titel"

[[questions]]
question = "En fråga ___ flera dolda ord, ___ där endast 1 är dolt åt gången."
type = "fill"
blankCount = 1
blanks = [ "med", "men" ]

[[questions]]
question = "Vad gäller för flervalsfrågor?"
type = "mcq"
correctAnswers = [
  "De kan ha flera rätta alternativ",
  "Mer än ett alternativ kan vara rätt"
]
incorrectAnswers = [ "Endast ett alternativ kan väljas" ]

[[questions]]
question = "Vad är 1+1?"
type = "number"
answer = 2
```