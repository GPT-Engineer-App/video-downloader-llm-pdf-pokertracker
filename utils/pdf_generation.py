from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

def create_pdf_storybook(analysis):
    pdf_path = "storybook.pdf"
    c = canvas.Canvas(pdf_path, pagesize=letter)
    width, height = letter
    for i, description in enumerate(analysis):
        c.drawString(100, height - 100 - i * 20, description)
    c.save()
    return pdf_path