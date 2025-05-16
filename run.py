from pathlib import Path
from src.batch_runner import extract_all

def main():
    data_dir = Path("data")
    df = extract_all(data_dir)
    df.to_csv("output/final_metadata.csv", index=False)
    print(f"\n✅ Processed {len(df)} PDFs. Output saved to output/final_metadata.csv")

if __name__ == "__main__":
    main()