# ngx-chess-board (Kid Chess Fork)

This fork of the `ngx-chess-board` package has been upgraded to **Angular 18**
using the **standalone architecture**. It introduces support for **FENs**
containing the `'C'` (whiteCoin) and `'c'` (blackCoin) characters, which inject
special training pieces called "coins". Coins are pieces that cannot move or
attack but can only be captured. These are useful for **Monster Chess**
activities in the Kid Chess App.

The package allows the inclusion of a chess game for two players on your site.

## Installation

For the **Kid Chess App**, after packaging the modified library:

1. Navigate to the `dist/ngx-chess-board` directory.
2. Run `npm pack` to create the tarball (e.g., `ngx-chess-board-2.2.3.tgz`).
3. Move the generated tarball to `local_packages/` in the **Kid Chess App**.
4. Ensure the `package.json` of the **Kid Chess App** includes the correct
   reference.

    ```json
    {
        "dependencies": {
            "ngx-chess-board": "file:./local_packages/ngx-chess-board-2.2.3.tgz"
        }
    }
    ```

After these steps, simply running `npm install` in the **Kid Chess App** will
bring in the modified `ngx-chess-board` package from the tarball.

For other projects, similar steps can be followed by ensuring the package is
built and installed locally.

## Demo

The demo of the original version is still available here:
[Original Demo](https://grzegorz103.github.io/ngx-chess-board/chess-board/index.html)

## Screenshots

![alt scr](https://i.ibb.co/NsRx0Pj/image.png)
![alt scr](https://i.ibb.co/b6ryJmP/image.png)

## Use Example

`ngx-chess-board` exports the following components:

-   `NgxChessBoardModule` (in older versions using `ngModule`)
-   `NgxChessBoardService`
-   `NgxChessBoardView`

### Standalone Setup (Angular 18)

In the **Kid Chess App**, this package has been refactored to use the
**standalone architecture** available in Angular 18. Although the original
package documentation uses `NgxChessBoardService` and `NgxChessBoardView`, in
this implementation we rely solely on the `NgxChessBoardComponent` for all
functionality without any issues.

1. **Import the component directly in your Angular component:**

    ```typescript
    import { NgxChessBoardComponent } from 'ngx-chess-board';
    ```

2. **Add the chess board component to your template:**
    ```html
    <ngx-chess-board></ngx-chess-board>
    ```

In the **Kid Chess App**, this setup has proven sufficient for leveraging all
the functionality of the package. The use of `NgxChessBoardService` and
`NgxChessBoardView` has not been necessary in this specific integration.

### FEN with White and Black Coins

In this fork, FEN strings can contain a `'C'` for a **whiteCoin** and `'c'` for
a **blackCoin**. These coins are immovable, non-attacking pieces useful for
specialized training drills.

-   **Example FEN with Coins:**
    ```
    rnbqkbnr/pppppppp/8/8/4C3/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
    ```

This FEN positions a whiteCoin on `e4`.

### Monster Chess

In the **Kid Chess App**, coins are used in training exercises called **Monster
Chess**, where players practice capturing static coins while maneuvering their
active pieces. This specialized game mode is incorporated directly into the
app's activities.

## API

#### @Inputs()

|           Input           |      Type      |                                                               Description                                                               |
| :-----------------------: | :------------: | :-------------------------------------------------------------------------------------------------------------------------------------: |
|         `[size]`          |     number     |             Sets size of the chess board (in pixels). Default value is <b>400</b>. Size must be in range between 100-4000.              |
|    `[lightTileColor]`     |     string     |                                Sets color of light tiles. Accepts predefined color names, RGB, HEX, HSL.                                |
|     `[darkTileColor]`     |     string     |                                Sets color of dark tiles. Accepts predefined color names, RGB, HEX, HSL.                                 |
|      `[showCoords]`       |    boolean     |                                    Sets visibility of coordination bar. Default value is <b>true</b>                                    |
|   `[sourcePointColor]`    |     string     |                                 Sets background color for the source box from where the piece is moved.                                 |
| `[destinationPointColor]` |     string     |                                Sets background color for the destination box where the piece is dropped.                                |
|     `[showLastMove]`      |    boolean     |                                      Specifies whether the last move should be highlighted or not.                                      |
|    `[showLegalMoves]`     |    boolean     |                                     Specifies whether the legal moves should be highlighted or not.                                     |
|     `[dragDisabled]`      |    boolean     |                               Specifies whether piece dragging is disabled. Default value is <b>false</b>                               |
|     `[drawDisabled]`      |    boolean     |                      Specifies whether drawing with right mouse button is disabled. Default value is <b>false</b>                       |
|     `[lightDisabled]`     |    boolean     |                           Specifies whether light pieces are disabled to move. Default value is <b>false</b>                            |
|     `[darkDisabled]`      |    boolean     |                            Specifies whether dark pieces are disabled to move. Default value is <b>false</b>                            |
|      `[pieceIcons]`       | PieceIconInput |                              Sets custom piece icons. Accepts SVG, IMG. Default the ASCII icons are used.                               |
|       `[freeMode]`        |    boolean     | Sets the board in free mode. In this mode pieces can be moved freely, even to tiles that aren't in possible moves or possible captures. |
|    `[showActivePiece]`    |    boolean     |                           Specifies whether active piece clicked has to be highlighted. Default value is true                           |
| `[showPossibleCaptures]`  |    boolean     |                            Specifies whether possible captures have to be highlighted. Default value is true                            |

<hr>

#### Outputs

|      Name      |        Type        |             Description             |
| :------------: | :----------------: | :---------------------------------: |
| `(moveChange)` | EventEmitter\<any> | Dispatch event when piece has moved |

<hr>

#### NgxChessBoardView methods

|                                      Method                                      | Return type |                                                                  Description                                                                   |
| :------------------------------------------------------------------------------: | :---------: | :--------------------------------------------------------------------------------------------------------------------------------------------: |
|                                     reset()                                      |    void     |                                                          Resets specified chess game                                                           |
|                                    reverse()                                     |    void     |                                                         Reverse specified chess board                                                          |
|                                      undo()                                      |    void     |                                                               Undo the last move                                                               |
|                                 getMoveHistory()                                 |    JSON     |                                    Returns array in JSON format which contains information about every move                                    |
|                               setFEN(fen: string)                                |    void     |                                                Allows to import specified board position by FEN                                                |
|                                     getFEN()                                     |   string    |                                                       Returns current board FEN position                                                       |
|                               move(coords: string)                               |    void     |                   Makes move by specified coords. The coords parameter contains source and destination position e.g. 'd2d4'.                   |
| addPiece(pieceTypeInput: PieceTypeInput, colorInput: ColorInput, coords: string) |    void     | Adds new piece to the board at specified square, e.g. 'd4'. Left click on a piece with control removes piece. Free mode must be enabled first. |
|                              setPGN(coords:string)                               |    void     |                                                     Imports board position in PGN notation                                                     |
|                                     getPGN()                                     |   string    |                                                 Returns current board position in PGN notation                                                 |
