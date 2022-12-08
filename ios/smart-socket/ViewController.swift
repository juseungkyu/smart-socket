import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var userId: UITextField!
    @IBOutlet weak var userPwd: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
    }
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        self.view.endEditing(true)
    }

    /** 웹 뷰로 이동 */
    @IBAction func tappedSearch(_ sender: Any) {
        let id: String = userId.text!
        let pwd: String = userPwd.text!
        
        if let navigationController = self.navigationController {
            
            if !(navigationController.topViewController?.description.contains("WebViewController"))! {
                let storyBoard: UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
                let viewController = storyBoard.instantiateViewController(withIdentifier: "WebViewController") as! WebViewController
                
                viewController.search = id
                viewController.url = "https://arduino.pukkuk.pp.ua/login"
                
                navigationController.pushViewController(viewController, animated: true)
            }
        }
    }
}

