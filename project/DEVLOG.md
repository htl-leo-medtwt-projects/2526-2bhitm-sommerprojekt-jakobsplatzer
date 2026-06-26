# Wolly's Way Home – Entwicklungslog

## Projektübersicht

Browserbasiertes Escape-Room-Spiel mit einem Lamm-Sprite (Wolly), das durch mehrere Game-Screens navigiert.  
**Tech-Stack:** Vanilla HTML / CSS / JavaScript (keine Frameworks)

---

## Dateistruktur

```
project/
├── index.html
├── style.css
├── js/
│   ├── spritegame_main.js        # Spielstand, Übergänge, LocalStorage, Events
│   ├── spritegame_player.js      # Bewegung, Kollisionen, Checkpoint-Logik
│   ├── spritegame_loop.js        # Game-Loop (setTimeout, _loopId-System)
│   ├── spritegame_keyevents.js   # Tastatur-Input
│   └── spritegame_detectCollisions.js  # AABB-Kollisionserkennung
├── img/
├── vid/
└── font/
```

---

## Implementierte Features

### 1. LocalStorage – Spielstand speichern/laden
- `saveGame(screen)` — speichert aktuellen Screen, Checkpoints, LevelFlags, Inventar-HTML, Spielerposition
- `loadSave()` — stellt den kompletten Spielstand wieder her
- `deleteSave()` — löscht den Spielstand
- `checkForSave()` — blendet den Continue-Button aus/ein (opacity + pointerEvents)
- **Continue-Button** auf dem Startscreen: ausgegraut wenn kein Save vorhanden

### 2. Inventory-Beam (Hotbar)
- 9 Slots, CSS-Grid (`repeat(9, 1fr)`)
- `background-size: 100% 100%` + `aspect-ratio: 1165/164` für korrekte Ausrichtung am Hintergrundbild
- Wird erst ab Game-Screen 1 eingeblendet
- Items als `let inventoryItem1–9`

### 3. Volles Inventar-Overlay (E-Taste)
- 36 Zellen in einem Grid (`grid-template-rows: 1fr 1fr 1fr 0.2fr 1fr`)
- Unterste Reihe (Zellen 28–36) = gespiegelte Beam-Items via `syncInventory()`
- Buch-Button öffnet Level-Fortschrittsmenü

### 4. Level-Fortschrittsmenü
- Level 1: 20% pro eingesammeltem Checkpoint, 100% wenn Game-Screen 2 erreicht
- Level 2: 50% wenn in Screen 2, 100% wenn Screen 3 erreicht
- Level 3: noch nicht implementiert

### 5. Checkpoints (Game-Screen 1)
- 3 Checkpoints → Zahlen **2**, **7**, **4** landen in Inventar-Slots 1–3
- `cp1`, `cp2`, `cp3` als Boolean-Flags
- Alle eingesammelt → Strohballen wird klickbar (hay, zIndex 1000)

### 6. Notizzettel (Game-Screen 1)
- Kollision mit `note-paper` → E-Button erscheint
- E drücken → Overlay öffnet sich (ESC zum Schließen)
- `notePaperOpen`-Flag verhindert Inventar-Öffnen während Overlay aktiv

### 7. Passwortschloss (Lock-Screen 1)
- Übergang via `transition-box1` (oben, 1rem Höhe) → `Game1ToLock1()`
- Korrektes Passwort: **724**
- Falsches Passwort: roter Flash-Effekt, Feld leert sich nach 800ms
- Enter-Taste bestätigt
- Zurück-Button → `Lock1ToGame1()` stellt Game1-Zustand wieder her

### 8. Game-Screen 2 – Übergang & Inhalt
- Korrektes Passwort → `clearInventory()` → **Schlüssel** (`key.png`) in Slot 1
- Inventar-Items werden bei Overgang geleert (clearInventory)
- Beim `loadSave` für game2: `restoreCheckpointsAndInventory()` stellt Inventar wieder her

#### Neue Elemente in Game-Screen 2:
| Element | Funktion |
|---|---|
| `#note-paper2` | Notizzettel (E-Taste → Overlay) |
| `#oil-item` | Öl-Kanne einsammeln → Inventar Slot 2 |
| `#transition-box2` | Falltür – nur mit Schlüssel + Öl öffenbar |
| `#e-button2` | Erscheint nahe note-paper2 |
| `#e-button3` | Erscheint nahe Falltür (nur mit beiden Items) |

#### Ablauf Game-Screen 2:
1. Wolly hat **Schlüssel** in Slot 1
2. Notizzettel lesen (hint: Öl nötig)
3. **Öl-Kanne** einsammeln → Slot 2
4. Zur **Falltür** gehen → bei Schlüssel + Öl erscheint `[E] – Schloss öffnen`
5. E drücken → `Game2ToGame3()` → Game-Screen 3

### 9. Kollisionsboxen
- `isColliding(div1, div2, tolerance)` — AABB mit offsetTop/Left/clientHeight/Width
- **Game-Screen 1:** `#cage-box1–6` (px-basiert)
- **Game-Screen 2:** `.cage-box2` mit `#cage2-box1–12` (%-basiert, `background-size: 100% 100%`)
- **Game-Screen 3:** `.cage-box3` mit `#cage3-box1–10` (%-basiert)
- `isCollidingWithAnyCage()` wählt je nach aktivem Screen die passenden Boxen

### 9b. Keller – begehbarer Bonus-Raum (nach dem Passwort)
Eigener Screen `#cellar-screen`. Liegt im Ablauf zwischen Passwortschloss und game2.

**Zugang/Ausgang (Stand: Keller nach Passwort):**
- **Gehege-Flucht:** In game1 macht der Heuhaufen (alle 3 Checkpoints) nur noch frei – Teleport nach `600/600` (kein Keller mehr am Heuhaufen).
- Von dort zur Tür (`transition1`) → `Game1ToLock1()` → Schloss.
- **Richtiges Passwort `724`** ruft `enterCellar()` auf (statt direkt game2). Blendet game1/Schloss aus, zeigt den Keller, spawnt Wolly mittig-unten (`0.50 / 0.72`).
- `exitCellar()` (nach gelöstem Rätsel, durch die Eisentür) führt jetzt in **game2**: `clearInventory()`, Schlüssel-Item sichtbar, `reachedG2 = true`, Spawn `0.70 / 0.70`, `saveGame('game2')`.

**Ablauf / Aufgaben:**
1. **Dunkelheit** (`#cellar-dark`, radialer Lichtkreis) – beim Betreten dunkel.
2. **Streichhölzer** (`#matches-item`) mit `[E]` einsammeln (`collectMatches`, landen in Slot 4) → `cellarHasMatches`.
3. **Laterne** (`#lantern-item`) mit `[E]` anzünden (nur mit Streichhölzern) → `lightLantern()` blendet Dunkelheit aus, leert Slot 4 (`cellarLit`).
4. **Notizzettel** (`#cellar-note`, `[E]` → Overlay) gibt den Hinweis: nur die äußeren Ventile öffnen.
5. **Ventil-Rätsel**: 3 unsichtbare Hotspots (`.cellar-valve`) über den gezeichneten Rädern. Wolly läuft ans Rad → geteilter Button `#e-button-valve` zeigt das nächste Rad mit Farbe an: „[E] - Rotes/Blaues/Grünes Rad auf-/zudrehen" (Text spiegelt den Zustand). `[E]` → `toggleValve(nearValve)`. Lösung `VALVE_SOLUTION = [true,false,true]` (rotes + grünes offen, blaues zu). Korrekt → `cellarSolved`, **Schlüssel** (`#cellar-key`, `key2.png`) erscheint. Nur drehbar wenn `cellarLit`.
6. **Schlüssel** einsammeln → `cellarHasKey`. **Ausgang** = Eisentür rechts (`#cellar-exit`) mit `[E]` → `exitCellar()`.

> `cellarDone` wird beim Verlassen gesetzt und mitgespeichert, gated aber nichts mehr (der Heuhaufen löst keinen Keller mehr aus).

**Assets:** Hintergrund `img/keller-background.png` (top-down, enthält Treppe, 3 Ventilräder, hängende Laterne, Eisentür). Items: `laterne.jpg` (JPG, weißer Hintergrund → `mix-blend-mode: multiply`), `streichholz.png` (transparent), `key2.png` (transparent).

**Wichtig (Stolperfallen):**
- `#cellar-screen` hat im CSS `display:none`. Zum Einblenden daher `style.display = 'block'` (nicht `''`, das würde auf `none` zurückfallen).
- `#player` z-index auf 5 angehoben, damit Wolly über dem Dunkelheit-Overlay (z 4), aber unter den Vollbild-Overlays (z 9999) liegt.
- Interaktive Elemente (Ventile/Eisentür) liegen als unsichtbare Hotspots exakt über den gezeichneten Hintergrund-Features; Zustand wird per Glow angezeigt (Ringe/Tür-Glühen), da das Hintergrundbild selbst statisch ist.

**Save:** Objekt `cellar: { hasMatches, lit, solved, hasKey, done, valves }`; Screen-Key `'cellar'` in `saveGame`/`loadSave`; Wiederherstellung in `restoreCellar()` (aus `restoreCheckpointsAndInventory` heraus).

### 10. Multiple-Loop-Bug Fix
- `let _loopId = 0` in loop.js
- Jeder neue `gameLoop(id)` Aufruf prüft `if (id !== _loopId) return`
- Verhindert parallele Loop-Instanzen (war Ursache für zufällige Resets zur Startseite)

### 11. Home-Button
- `position: absolute; top: -3.5rem` (absichtlich halb versteckt)
- Hover: `top: -3rem`
- Klick → Bestätigungsdialog → Save löschen → `location.reload()`

### 12. Endscreen (game4) – Kino-Abspann
- Reiner CSS-Effekt, kein JS. Startet automatisch, sobald `#game-screen4` sichtbar wird.
- `#credits-roll` läuft per `@keyframes creditsRoll` von `translateY(100vh)` nach `translateY(-100%)` (26s linear, einmalig).
- `#credits-viewport` legt eine Abdunklung (`rgba(0,0,0,0.7)`) über die Herde, damit der Text lesbar ist; am Ende fadet sie via `@keyframes creditsDim` (Start 25.5s) auf transparent → die helle Herde (Happy End) wird wieder freigegeben.
- Texte nutzen den roten Titel-Look (Titel) bzw. cremefarbene/goldene Klassen (`.credits-role`, `.credits-name`).
- `#restart-button` sitzt fix unten rechts (z-index 10), liegt damit außerhalb der zentrierten Abspann-Spalte und bleibt jederzeit klickbar.
- Inhalte (Namen/Rollen) sind im HTML leicht editierbar.

---

## E-Taste Logik (Prioritäten)

```
E gedrückt:
1. Inventar offen? → schließen
2. ebutton3 sichtbar (Falltür)? → Game2ToGame3()
3. ebutton2 sichtbar (note-paper2)? → openNotePaper2()
4. ebutton sichtbar (note-paper)? → openNotePaper()
5. sonst → openInventory()

ESC gedrückt:
1. Level-Menü offen? → schließen
2. notePaper2Open? → closeNotePaper2()
3. notePaperOpen? → closeNotePaper()
4. inventoryOpen? → closeInventory()
```

---

## CSS – Wichtige Regeln

| Selektor | Wichtige Eigenschaft |
|---|---|
| `#inventory-beam` | `background-size: 100% 100%`, `aspect-ratio: 1165/164` |
| `#game-screen2` | `background-size: 100% 100%` (für %-Cage-Positioning) |
| `.inv-cell:nth-child(n+28)` | `grid-row: 5` (Beam-Sync im Inventar) |
| `#inventory-grid` | `grid-template-rows: 1fr 1fr 1fr 0.2fr 1fr` |
| `.inv-item-img` | `width: 55%; height: 55%; object-fit: contain` |

---

## Bekannte offene Punkte

- [ ] Debug-Farbe `.cage-box2` ist auskommentiert — bei Bedarf wieder einkommentieren zum Justieren
- [ ] `inv-cell` Debug-Border ggf. noch aktiv
- [ ] Level 3 (game-screen3): `levelFlags.reachedG3` existiert, Puzzle noch nicht implementiert
- [ ] `Game2ToGame3()` setzt Spieler auf `50% / 70%` — ggf. anpassen
- [x] Endscreen (game4): Kino-Abspann umgesetzt (CSS-Credits-Roll + Abdunklung mit Fade-out)

---

## Spielstand-Struktur (LocalStorage)

```json
{
  "screen": "game2",
  "checkpoints": { "cp1": true, "cp2": true, "cp3": true },
  "flags": { "reachedG2": true, "reachedG3": false },
  "inventory": ["<img src='img/key.png'...>", "<img src='img/oil.png'...>", "", "", "", "", "", "", ""],
  "playerX": "400px",
  "playerY": "400px"
}
```

---

*Letzte Aktualisierung: Juni 2026*
