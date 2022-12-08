import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var userId: UITextField!
    @IBOutlet weak var userPwd: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        /* 웹뷰로 이동하기 */
        if let navigationController = self.navigationController {

            if !(navigationController.topViewController?.description.contains("WebViewController"))! {
                let storyBoard: UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
                let viewController = storyBoard.instantiateViewController(withIdentifier: "WebViewController") as! WebViewController
                viewController.url = "https://arduino.pukkuk.pp.ua/login"

                navigationController.pushViewController(viewController, animated: true)
            }
        }
        
    }
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        self.view.endEditing(true)
    }

}

