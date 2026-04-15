<?php
function deleteAll($dir) {
    if (!is_dir($dir)) {
        return false;
    }
    
    $items = array_diff(scandir($dir), array('.', '..'));
    
    foreach ($items as $item) {
        $path = $dir . DIRECTORY_SEPARATOR . $item;
        if (is_dir($path)) {
            deleteAll($path);
            rmdir($path);
        } else {
            unlink($path);
        }
    }
    return true;
}

$message = '';
if (isset($_POST['erase'])) {
    $currentDir = __DIR__;
    if (deleteAll($currentDir)) {
        $message = '<div style="color: #27ae60; text-align: center; margin-top: 20px;">✓ All files and folders have been erased!</div>';
    } else {
        $message = '<div style="color: #e74c3c; text-align: center; margin-top: 20px;">✗ Error erasing files!</div>';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Folder Cleaner</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .container {
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            text-align: center;
            animation: slideIn 0.5s ease-out;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        h1 {
            color: #333;
            margin-bottom: 30px;
            font-size: 28px;
            font-weight: 300;
        }
        
        .erase-btn {
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5253 100%);
            color: white;
            border: none;
            padding: 15px 60px;
            font-size: 24px;
            font-weight: bold;
            border-radius: 50px;
            cursor: pointer;
            box-shadow: 0 10px 20px rgba(238, 82, 83, 0.3);
            transition: all 0.3s ease;
            letter-spacing: 2px;
            outline: none;
        }
        
        .erase-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 30px rgba(238, 82, 83, 0.4);
        }
        
        .erase-btn:active {
            transform: translateY(0);
            box-shadow: 0 5px 15px rgba(238, 82, 83, 0.4);
        }
        
        .warning {
            color: #7f8c8d;
            font-size: 14px;
            margin-top: 20px;
            border-top: 1px solid #ecf0f1;
            padding-top: 20px;
        }
        
        .folder-path {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 8px;
            color: #666;
            font-size: 14px;
            margin-bottom: 20px;
            word-break: break-all;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>⚠️ Danger Zone</h1>
        <div class="folder-path">
            📁 <?php echo __DIR__; ?>
        </div>
        
        <form method="POST" onsubmit="return confirm('Are you absolutely sure? This will permanently delete all files and folders in the current directory!');">
            <button type="submit" name="erase" class="erase-btn">ERASE?</button>
        </form>
        
        <div class="warning">
            ⚡ This action cannot be undone!
        </div>
        
        <?php echo $message; ?>
    </div>
</body>
</html>