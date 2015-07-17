# mosaic-app

This project contains common (non-UI) application classes.
It allows to manage the following application aspects:

* Application modules management - application can register multiple modules and 
  manage their lifecycle. Each module can be activated/deactivated or updated.
  Each application can have one active module at once.
* Application state management - the whole runtime application state 
  can be defined using a serializable state object. Changing application state
  leads to module updates.
* URL management - it is possible to define a URL mask which reflects
  (fully or partially) the application state. URL changes leads to changes in 
  the application state and application state modifications refreshes URLs.
  The application core does not manage mapping of this virtual URL to 
  the browser navigation bar.  
* Localization (l10n) / internationalization (i18n)