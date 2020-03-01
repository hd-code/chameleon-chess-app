# Kommentare zur Abgabe für PME

Hallo Herr Avemarg,

ich nutze mal diese Datei um ein paar Kommentare zu hinterlassen, die nur für die Abgabe für PME interessant sind. So bleibt die README mit allgemeinen Kommentaren bestückt und alles wird ein bisschen übersichtlicher.

## Erfolge

Die App ist meiner Meinung nach sehr gut gelungen und enthält viele schöne Kleinigkeiten.

Es gibt verschiedene Spracheinstellungen, ein schlüssiges Desgin, eine komplett funktionierende Spiellogik, sogar schon mit einem ersten Computergegner, der für meine Begriffe schon recht stark ist. Einstellungen und das aktuelle Spiel werden persistent gespeichert. Die Code-Struktur ist übersichtlich und einfach erweiterbar. Dank der Integration von Typescript ist Typensicherheit gewährleistet – auch im dynamischen JavaScript. Überall werden function components verwendet, was eine nette kleine Herausforderung gewesen ist.

Gut gelungen sind meiner Meinung nach auch diverse 'Modifizierungen' der React Native Basis components. Damit meine ich z.B. die `Text` oder `Image` components. Durch das Überladen dieser Basis-Komponenten mit eigenen Custom-Settings, ist der ganze Workflow recht schnell und angenehm gewesen.

Auch die Aufteilung in zum Einen die Logik-Bibliothek und zum Anderen die eigentliche App ist sehr hilfreich gewesen, da man die verschiedenen Aspekte getrennt von einander bearbeiten und lösen konnte.

Was ebenfalls ein sehr schönes Feature ist, zumindest bei iOS: man kann nun tatsächlich das Spielbrett heran- und herauszoomen. Letztenendes war das einfacher als gedacht. React Native bietet eine `ScrollView` component an. In dieser kann ein `maximumZoomScale` definiert werden. Durch den ist es möglich, den Inhalt der ScrollView einfach mit zwei Fingern heran zu zoomen (mit zwei Fingern das Spielbrett 'auseinander' ziehen, also die klassische Zoom-Geste). In den Simulatoren, kann diese Geste umgesetzt werden, indem man `alt` gedrückt hält und dann die Maus benutzt. Für Android scheint es dafür wirklich keine einfache Lösung zu geben, aber immerhin auf iOS ist das einfach und elegant geglückt.

## Herausforderungen

React Native ist im Ansatz recht gut dokumentiert. Sobald es aber um Detail-Fragen geht, findet man nicht wirklich gute Erläuterungen in der offiziellen Dokumentation. Am Ende helfen Inspiration durch StackOverflow und Beiträge auf Medium sowie schlichtes Herumprobieren, was mitunter recht lange dauern kann.

Einige Kernkonzepte sind in React erklärt und die Leute von React Native haben keine Notwendigkeit gesehen, dies nochmal zu erläutern (soweit okay). Allerdings wäre ein Verweis auf die React Doku hier und da sehr hilfreich gewesen. Im Großen und Ganzen kommt man aber ganz gut zurecht.

Es gibt immer mal wieder Unterschiede zwischen Android und iOS. Diese sind meistens ganz gut dokumentiert (zumindest dass es sie gibt). Eine Lösung dafür zu finden ist manchmal ganz einfach, manchmal (in Bezug auf die ScrollView) sehr schwer bis vielleicht gar nicht möglich. Ist ein bisschen deprimierend, weil meistens auf iOS alles richtig gut funktioniert und aussieht und dann fährt man mal die Android-Geräte hoch...

Es ist zeitweise vorgekommen, dass aus unerfindlichen Gründen die iOS und/oder Android App nicht mehr richtig funktioniert hat. In so einem Fall kann man nicht wirklich etwas tun, weil es ja kein Problem auf der Server-Seite ist, sondern irgendwo ganz tief in dem nativen Code der Apps. Wenn das passiert ist, hat nur geholfen ein neues Projekt zu erstellen und den Code rüber zu kopieren. Daher sind in diesem Git-Repo diverse Branches mit unterschiedlichen Zuständen des frisch initialisierten React Native Projektes, um schnell neustarten zu können, falls das mal wieder passiert.

Auf Android gibt es einen Bug bei der LayoutAnimation (ist verantwortlich, dass die verschiedenen Rendering smooth in einander übergehen und nicht einfach hart zur neuen Ansicht springen). Diese scheint generell noch so einige Probleme zu haben. Ich versuche, dass genaue Problem zu isolieren und als Issue zu posten. Eine einfache Übergangslösung ist eingebaut.

## Ausblick

Thema meiner BA ist ja das Erstellen eines Computergegners mit Hilfe eines neuronalen Netzes. Ich hoffe sehr, dass es mir gelingt das umzusetzen, dann wird der Computergegner hier direkt ausgetauscht. Bzw. stelle ich mir vor den Gegner in verschiedenen Schwierigkeitsstufen anzubieten – leicht, mittel, schwer. Die genauen Details hier werden sich 'unterwegs' ergeben.

Wie besprochen, habe ich das Tutorial bisher noch nicht umgesetzt. Da bin ich noch auf der Suche, nach einem passenden Format. Viele Brettspiel-Apps lösen die Aufgabe über die Einblendung von Hinweis-Texten während des Spiels. So etwas in der Art, wäre wahrscheinlich sinnvoll. Da werde ich mich mal mit ein paar Test-Spielern abstimmen und ein paar Möglichkeiten durchprobieren. Das ist noch ein etwas umfassenderes Thema.

Lediglich in der Spiellogik gibt es umfangreiche Unit-Tests. Sie haben recht, dass Tests für visuelle Komponenten eher schwierig zu bewerkstelligen sind. Wenn ich dieses Jest-Framework richtig verstanden haben, kann es Snapshots der App anlegen und zeigt nach einer Änderung im Code, wie sich der Snapshot verändert hat. Daraufhin kann man angeben, ob diese Änderung gewollt ist oder nicht. So richtig elegant ist das ganze aber nicht. Ich werde mich in Zukunft wohl erstmal auf die Unit-Tests der Logik beschränken, die funktionieren zuverlässig und sind sehr hilfreich.

Bei Gelegenheit werde ich weiter versuchen eine Android-Lösung für das Heranzoomen des Spielbretts zu finden. Wenn es ganz aussichtslos ist, dann werde ich mir das etwas ganz anderes einfallen lassen müssen. Das wird sich zeigen.

Die Idee für einen 'Farbblinden-Modus' habe ich erstmal komplett verworfen. Da sind zu viele Fragen offen und Lösungen in schwarz-weiß-grau haben Auswirkung auf die Lesbarkeit von Texten und vieles mehr. Sollte das wirklich mal ein Thema werden, kann man sich damit immer noch beschäftigen.

Das 'Holzbrett' im Hintergrund gefällt mir noch nicht so ganz. Perspektivisch hätte ich gerne ein Holzbrett, was eher ein 'Cartoon' Style hat. Bisher bin ich noch nicht fündig geworden. Vielleicht kann meine Schwester mir da etwas designen oder ich gehe wirklich mal zu einem Profi dafür. Die bisherige Lösung ist auch okay, aber ein bisschen Perfektionist ist man ja schon. ;-)

## Fazit

Sie sehen, es gibt noch einiges zu tun, aber sehr viel ist auch bereits umgesetzt. Dank PME ist das Projekt immens vorangeschritten. Ich finde das Ergebnis schon sehr gelungen und bin da auch ein bisschen stolz drauf. Das ganze hat (von ein paar Ärgernissen mit React Native einmal abgesehen) immens viel Spaß gemacht. Vielen Dank dafür :-)