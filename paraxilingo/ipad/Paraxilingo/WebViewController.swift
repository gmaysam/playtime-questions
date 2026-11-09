import UIKit
import WebKit

/// Shows the Paraxilingo game full screen.
/// It opens the live website, so every update reaches the iPad by itself (no new Xcode build needed).
/// With no internet it falls back to the copy in the blue "Web" folder.
class WebViewController: UIViewController, WKNavigationDelegate {
    private var webView: WKWebView!
    private let liveURL = URL(string: "https://gmaysam.github.io/playtime-questions/")!
    private var usedFallback = false

    override func loadView() {
        let config = WKWebViewConfiguration()
        config.allowsInlineMediaPlayback = true
        config.mediaTypesRequiringUserActionForPlayback = []   // Lulu can talk without a tap first
        config.websiteDataStore = .default()                     // keeps progress and the offline copy
        // no text selection, magnifier or long-press menus: it should feel like an app
        let css = "*{-webkit-user-select:none;-webkit-touch-callout:none}"
        let js = "var s=document.createElement('style');s.textContent='\(css)';document.documentElement.appendChild(s);"
        config.userContentController.addUserScript(WKUserScript(source: js, injectionTime: .atDocumentEnd, forMainFrameOnly: true))

        webView = WKWebView(frame: .zero, configuration: config)
        webView.navigationDelegate = self
        webView.isOpaque = false
        webView.backgroundColor = .white
        webView.scrollView.bounces = false
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.allowsLinkPreview = false
        view = webView
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        // always ask the server for the newest page (not an old saved one)
        webView.load(URLRequest(url: liveURL, cachePolicy: .reloadRevalidatingCacheData, timeoutInterval: 12))
    }

    private func loadBundledCopy() {
        guard !usedFallback, let page = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "Web") else { return }
        usedFallback = true
        webView.loadFileURL(page, allowingReadAccessTo: page.deletingLastPathComponent())
    }

    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) { loadBundledCopy() }
    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) { loadBundledCopy() }

    override var prefersStatusBarHidden: Bool { true }
    override var prefersHomeIndicatorAutoHidden: Bool { true }
}
