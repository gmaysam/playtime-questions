PARAXILINGO FOR iPAD
====================
First time (about 10 minutes):
1. Open Paraxilingo.xcodeproj (double-click it). Xcode opens.
2. Xcode menu > Settings > Accounts > "+" > Apple ID. Sign in with your normal Apple ID (free is fine).
3. In the left list click the blue "Paraxilingo" project, then the "Paraxilingo" target > "Signing & Capabilities".
   Team: pick your name (Personal Team). If it says the bundle identifier is taken, change
   com.maysamgorji.paraxilingo to something like com.maysamgorji.paraxilingo2.
4. Plug the iPad into the Mac with a cable. On the iPad tap "Trust This Computer".
   (iOS 16 or newer: iPad Settings > Privacy & Security > Developer Mode > On, then restart.)
5. At the top of Xcode pick the iPad as the run destination, then press the Play button (Run).
6. The first time, the iPad says "Untrusted Developer": on the iPad open
   Settings > General > VPN & Device Management > your Apple ID > Trust. Then tap the Paraxilingo icon.

After Claude changes the game:
   Claude replaces the "Web" folder inside Paraxilingo/. Open the project and press Run again. Progress is kept.

Every 7 days (free Apple ID only):
   The app stops opening. Plug in the iPad and press Run again. (A paid Apple Developer account, $99/year, lasts 1 year.)
