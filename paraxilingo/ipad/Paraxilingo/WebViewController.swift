import UIKit
import WebKit

/// Shows the Paraxilingo game (the files in the blue "Web" folder) full screen.
/// To update the game, replace the Web folder and press Run again.
class WebViewController: UIViewController {
    private var webView: WKWebView!

    override func loadView() {
        let config = WKWebViewConfiguration()
        config.allowsInlineMediaPlayback = true
        config.mediaTypesRequiringUserActionForPlayback = []   // Lulu can talk without a tap first
        // no text selection, magnifier or long-press menus: it should feel like an app
        let css = "*{-webkit-user-select:none;-webkit-touch-callout:none}"
        let js = "var s=document.createElement('style');s.textContent='\(css)';document.documentElement.appendChild(s);"
        config.userContentController.addUserScript(WKUserScript(source: js, injectionTime: .atDocumentEnd, forMainFrameOnly: true))

        webView = WKWebView(frame: .zero, configuration: config)
        webView.isOpaque = false
        webView.backgroundColor = .white
        webView.scrollView.bounces = false
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.allowsLinkPreview = false
        view = webView
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        guard let page = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "Web") else {
            let l = UILabel(); l.text = "Web folder is missing"; l.textAlignment = .center; view = l; return
        }
        webView.loadFileURL(page, allowingReadAccessTo: page.deletingLastPathComponent())
    }

    override var prefersStatusBarHidden: Bool { true }
    override var prefersHomeIndicatorAutoHidden: Bool { true }
}
