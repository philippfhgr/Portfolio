# Portfolio-Webseite

## Beschreibung

Eine eigene Portfolio-Seite für Bewerbungen und als Visitenkarte.

![Adobe Express - dokgif(1)](https://github.com/user-attachments/assets/df264a5d-cb44-41c5-bac3-b9978244995d)

## Auftrag

Ich möchte eine Portfolio-Webseite erstellen und über meinen Homeserver hosten. Die Webseite soll dann zuverlässig, öffentlich zugänglich sein und (möglichst) keine Risiken bezüglich Datensicherheit oder Privatsphäre enthalten. Den Homeserver nutze ich zurzeit als NAS, welches ich auch über Tailscale remote erreichen kann. Ich plane die Webseite über einen Tunnel bei Cloudflare erreichbar zu machen und möchte sowohl nginx sowie nginx Proxy Manager nutzen. Auf dem Server läuft TrueNAS.

## Entwicklungsprozess

Zuerst hatte ich Schwierigkeiten, die Verbindung vom Tunnel zum Proxy Manager zu erstellen. Es war leider zu kompliziert für ChatGPT und Tutorials für meine Herangehensweise gab es auch keine. Deshalb hat die Domain ein Jahr lang mit der Seite «Access Denied» geruht. Mit dem Fortschritt bei ChatGPT konnte ich die Ports dann alle richtig einstellen. Ausserdem musste auch kein LetsEncrypt Zertifikat erstellt werden, weil dieses bereits von Cloudflare übernommen wird. Zuletzt konnte ich die Berechtigungen in mühevoller Arbeit richtig einstellen. So hat jetzt alles Zugriff auf das, was es muss und der Informationsweg funktioniert sauber, sicher und Privacy orientiert.

## Designentscheidungen

Mir war wichtig, dass möglichst viele Informationen mit möglichst wenigen Klicks ersichtlich sind. Wenn ich persönlich auf eine Seite gehe, dann möchte ich vor allem eins: Informationen. Geordnete Unterseiten kann ich bei einem hohen Informationsgehalt nachvollziehen aber spätestens bei langwierigen Scrollytelling Seiten wird es mühsam.
Deswegen habe ich meine Seite bewusst auch nach meinen Vorzügen aufgebaut. Ein One-Pager mit direkten Verlinkungen. Theoretisch braucht es gar keinen Klick und es ist schon gut ersichtlich welche Projekte ich in den letzten Jahren erarbeitet habe. Wer mehr wissen möchte, findet aber auch mehr Informationen mit 1-2 Klicks.

## Inspirationen

Designtechnisch habe ich mich vor allem von der Unreal Engine Seite inspirieren lassen. Aber auch die Seite von der Unity Engine hat mir Inspiration geliefert. Mir gefällt, dass direkt ersichtlich ist, für was die Engines benutzt werden können. Ausserdem ist der Look modern, professionell und zugleich technisch.

## Fehlschläge und Umplanung

Ich habe versucht, Ports über meinen Router öffentlich zu schalten. Das hat aber zum Glück aufgrund der Router-Konfiguration nicht funktioniert. Es hätte auch erhebliche Sicherheitslücken eröffnet, welche ich mit der jetzigen Konfiguration umgehen konnte.

Die Swipe-Funktion bei den Projekten musste ich leider löschen, weil es mit der Verlinkung Komplikationen gab. Die Swipe-Funktion muss zwangsweise ganz oben sein, dann kann aber nicht mehr verlinkt werden. Das hindert die Funktionsweise auf Touchgeräten zwar etwas aber übergreifend erweitert die Verlinkung die Funktion der Seite enorm, weswegen ich mich für diesen Kompromiss entschieden habe.

Beim Testing in einem anderen Browser ist mir aufgefallen, dass eine Schriftart anders dargestellt wird als in meinem Browser, so dass der Text kaum lesbar war. Deshalb habe ich für den Haupttext Roboto als neue Schriftart gewählt. Diese ist weit verbreitet und wird sicher von allen Browsern korrekt dargestellt.

## Challenges

Die serverseitige Integration hatte definitiv seine Challenges und Kniffe wie bereits beschreiben. Weitere Challenges waren die Lightboxen korrekt darzustellen. Ich hatte lange nur eine Lightbox für alle Inhalte. So wurden die Videos auch unten bei der Galerie angezeigt. Ich habe es dann so gelöst, dass ich eine Lightboxen für je Projekte und Galerie erstellt habe und diese dann auch fix über den ganzen Viewport gelegt habe. Das gefällt mir auch deutlich besser.

Schwierig fand ich auch die Entscheidung zu den Projektbeschrieben. Soll der Text die Hintergründe wie Equipment, Management, Planung usw. beinhalten oder lieber das Endprodukt beschreiben? Ich habe mich für einen Hybrid entschieden mit dem Fokus auf die Beschreibung des Endprodukts. Ich denke, für Aussenstehende ist es zuerst eher interessant, was ich gemacht habe und nicht wie ich es gemacht habe.

## Server
 
*Request-Flow*<img width="1280" height="522" alt="ablauf" src="https://github.com/user-attachments/assets/e6052eea-9e9b-40ed-aeec-d5cb56eacd40" />

•	Internet<br>
User ruft https://philipphorber.ch auf.

•	Cloudflare<br>
DNS, HTTPS, Schutz vor Bots/Angriffen, verschleiert meine IP.

•	Cloudflare Tunnel<br>
Verschlüsselte Verbindung von Cloudflare zu meinem Homeserver.

•	nginx<br>
Liefert die Webseiten-Daten aus.

•	Webseiten-Daten<br>
Daten liegen im TrueNAS Dateisystem und wird von nginx ausgeliefert.

Mir war wichtig, dass ich keine persönlichen Daten unnötig preisgebe. So habe ich Telefonnummer und Emailadresse aus dem Mockbewerbungsvideo geschnitten und diese auch sonst nicht auf der Seite publiziert. Ich bin zwar im Video klar zu erkennen aber habe von mir bewusst kein Portraitfoto für die About Section gewählt. Auch im Registrar habe ich darauf geachtet, dass meine Adresse nicht ersichtlich ist.
Ich bin erreichbar über Formspree. So muss ich auch dort nicht meine Emailadresse preisgeben. Mir ist bewusst, dass der Formspree Code bei Github zu sehen ist. Dieser kann aber nicht ausserhalb meiner Seite verwendet werden. Ausserdem habe ich Einstellungen gegen Spam und Bots vorgenommen. Das Einzige was passieren kann, ist das Jemand manuell mein Monatslimit aufbraucht.
Die Serverseite ist mit dem Tunnel über Cloudflare gut abgesichert. Ich muss keine Ports öffentlich stellen oder direkten Zugriff zu meinem Server bieten.

## Lerneffekt

Ich durfte mich mit der Serverstruktur auseinandersetzen und habe jetzt ein tieferes Verständnis wie Webseitendaten geliefert werden. Ausserdem konnte ich meine Programmierfähigkeiten verbessern, neue Funktionen kennenlernen und eine Designsprache für mich finden. Letztere habe ich so dann auch in meinen Bewerbungsunterlagen umgesetzt, so dass ein kohärentes Ganzes entsteht.
Ich habe mich vertieft mit dem Thema Privacy auseinandergesetzt und bin in meiner Reise auch auf Tatsachen wie Fingerprinting oder Crawlerbots aufmerksam geworden. Ich habe gelernt, wie ich meine Identität und Privatsphäre trotz Portfolio-Seite schützen kann.

## Known Bugs

Ich war für ein paar Tage in den Bergen und als ich zurückkam, war mein Server ausgeschaltet (aus ungeklärten Gründen) und die Webseite somit down. Die Reliability ist demnach sicher etwas eingeschränkt. Wenn der Server abstürzt oder die Dockerversionen updaten, wir die Seite down gehen. Und je nach dem wie weit weg ich vom Server bin, dauert es auch seine Zeit, bis der Server wieder läuft und die Seite wieder online ist. Da so ein Absturz aber äusserts selten vorkommen sollte, ist das für mich eine Limitierung, die ich akzeptieren kann. Kürzliche Ereignisse haben gezeigt, dass auch AWS oder Cloudflare keine perfekte Uptime haben.

Sobald ich weitere Fotos hinzufügen möchte, sollte ich auch für die Galerie ein Karussell einrichten. Gerade bei der Mobile Version nehmen ansonsten die einzelnen Fotos zu viel Platz weg. Ich werde dann ein Karussell für jeweils vertikale und horizontale Bilder einfügen.

Um SEO bin ich nicht so besorgt, weil ich nicht davon ausgehe, dass ich seriös aus dem Nichts angeschrieben werde, schaden würde es aber sicher nicht.

## Planung

Ich plante Ende November einen einwöchigen Programmier-Retreat in den Bergen. Aufgrund einer Stellenausschreibung musste die Webseite dann aber schon früher fertig werden. Kleinere Anpassungen habe ich danach noch erledigt.
Ansonsten habe ich immer wieder daran gearbeitet und wurde so schon früh vor dem Abgabetermin fertig.

## Hilfsmittel

Mir hat vor allem ChatGPT geholfen. Ohne das hätte ich die Serverumsetzung wahrscheinlich nicht geschafft oder hätte über Foren oder bei Dozierenden Hilfe suchen müssen.
Ich habe vom Code viel selbst geschrieben aber bei den Scripts habe ich mir gerne helfen lassen. Auch bei kleineren Fragen oder Abklärungen hat mich ChatGPT gut unterstützt.

## Video Upload

Mockbewerbungsvideo Webseite: https://www.youtube.com/watch?v=xCk-LwtYKxA

Portfolio Video: https://www.youtube.com/watch?v=WXNFyjhpKVE

## Protokoll

Juli 2024:
Aufsetzen Serverstruktur mit Tunnel, Dockerinstallation und Domainerwerb. Zu diesem Zeitpunkt leider nicht erfolgreich aufgrund falscher Ports.

August 2025:
Erfolgreiches Liveschalten der Webseite. Erstes Testseite ist online erreichbar.

20.10.25:
Initiales Aufsetzen von HTML und CSS. Einbindung von Fonts.

21.10.25:
Erster Videoschnitt für Hero. Ausarbeiten der Grundstruktur mit Sections.

27.10.25:
Nav-Bar programmieren mit Verlinkungen zu den Sections. Erstellen der Projekt-Carousels mit Platzhaltern. About-Section mit Platzhaltern befüllen und Mockbewerbungsvideo neu schneiden und einfügen.

28.10.25:
Kontaktformular erstellt und mit Formspree verknüpfen. Bilder bei Projekten einsetzen und Platzhaltertexte ersetzen. Formspree möglichst Spamsicher einrichten.

03.11.25:
Weitere Platzhaltertexte ersetzen und Videos oder Dokumentation im Carousel verlinken für Lightbox-Implementierung.

04.11.25:
CSS-Anpassungen. Hintergrund, Scroll Margin, data-animate, etc. About Platzhalter ersetzt.

10.11.25:
Fotogalerie hinzugefügt und angepasst. Fotos und Bilder durch .webp ersetzen für schnellere Ladezeiten.

11.11.25:
Grössen der Fotos beschränkt für optimierte Ladezeiten. Hero Video neu geschnitten und erweitert. Nav-Bar erweitert.

17.11.25:
Mobile Support Optimierung.

18.11.25:
Kleinere Anpassungen inkl. Bugfixes.

19.11.25:
Coaching-Termin mit Jasper

20.11.25:
Live-Schaltung der Portfolio-Webseite.

22.11.25:
Erste Bewerbung mit Portfolio-Webseite.

02.12.25:
Dokumentation Anpassungen und ein Bild ausgetauscht. Google Indexierung beantragt.

03.12.25:
Testing und Korrekturen. Font und Font-Implementierung ausgetauscht.

12.12.25:
Vereinheitlichung der Abstände und Scroll-Margins. Layout Anpassungen. Dokumentation fertig gestellt.
Hero Video komprimiert, optimiert und neu geschnitten. JS ausgelagert.

17.12.25:
Hamburger-Dropdown für Mobile hinzugefügt sowie Favicons.

06.01.25:
"Work in progress" entfernt und finale Links hinterlegt nach Abschluss der Projekte.
