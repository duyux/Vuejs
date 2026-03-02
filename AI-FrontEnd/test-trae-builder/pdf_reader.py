import pdfplumber
import os

# 打开PDF文件
pdf_path = "2501.12948.pdf"

with pdfplumber.open(pdf_path) as pdf:
    # 获取总页数
    total_pages = len(pdf.pages)
    print(f"PDF总页数: {total_pages}")
    
    # 创建用于保存图表的目录
    os.makedirs("extracted_images", exist_ok=True)
    
    # 读取每一页的内容
    for page_num in range(total_pages):
        page = pdf.pages[page_num]
        print(f"\n=== 第 {page_num + 1} 页 ===")
        
        # 提取文本内容
        text = page.extract_text()
        if text:
            # 只打印前500个字符，避免输出过多
            print(f"文本内容前500字符: {text[:500]}...")
        
        # 提取图表
        images = page.images
        if images:
            print(f"找到 {len(images)} 个图像")
            for img_idx, img in enumerate(images):
                # 尝试提取图像
                try:
                    # 获取图像边界框
                    bbox = (img["x0"], img["top"], img["x1"], img["bottom"])
                    # 裁剪页面获取图像
                    img_obj = page.within_bbox(bbox).to_image(resolution=300)
                    img_path = f"extracted_images/page{page_num + 1}_img{img_idx + 1}.png"
                    img_obj.save(img_path)
                    print(f"已保存图像: {img_path}")
                except Exception as e:
                    print(f"提取图像时出错: {e}")
    
    # 获取文档元数据
    print(f"\n=== 文档元数据 ===")
    print(f"标题: {pdf.metadata.get('Title', '未知')}")
    print(f"作者: {pdf.metadata.get('Author', '未知')}")
    print(f"创建日期: {pdf.metadata.get('CreationDate', '未知')}")
    print(f"修改日期: {pdf.metadata.get('ModDate', '未知')}")
