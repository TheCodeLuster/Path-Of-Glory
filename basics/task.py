class Berry:
    def __init__(self, name, color, vitamins):
        self.name = name
        self.color = color
        self.vitamins = vitamins

    def __repr__(self):
        return f"Berry(name={self.name!r}, color={self.color!r}, vitamins={self.vitamins})"

class Compote:
    def __init__(self, color):
        self.color = color
        self.berries = []

    @property
    def name(self):
        return f"{self.color.capitalize()} Compote"

    def add(self, berry):
        self.berries.append(berry)

    def unique_vitamins(self):
        set1 = set()
        for b in self.berries:
            for v in b.vitamins:
                set1.add(v.upper().strip())
        return sorted(set1)

def read_berries(filename="berries.txt"):
    berries = []
    try:
        with open(filename) as file:
            for l, line in enumerate(file, 1):
                line = line.strip()
                if not line or line.startswith('#'):
                    continue
                parts = [p.strip() for p in line.split('|')]
                if len(parts) != 3:
                    print(f"Skipping bad line {l}: {line}")
                    continue
                name, color, vit_str = parts
                if not name or not color:
                    print(f"Empty name/color on line {l}")
                    continue
                vitamins = [v.strip() for v in vit_str.split(',') if v.strip()]
                berries.append(Berry(name, color.lower(), vitamins))
    except FileNotFoundError:
        print(f"Couldn't open input file '{filename}'")
        return []
    return berries

def group_compotes(berries):
    comp_by_color = {}
    for berry in berries:
        col = berry.color
        if col not in comp_by_color:
            comp_by_color[col] = Compote(col)
        comp_by_color[col].add(berry)
    compotes = list(comp_by_color.values())
    compotes.sort(key=lambda c: (-len(c.berries), c.name))
    return compotes

def write_descriptions(compotes, filename="compote_descriptions.txt"):
    with open(filename, 'w') as file:
        for compote in compotes:
            file.write(f"{compote.name}\n")
            names = ", ".join(b.name for b in compote.berries)
            file.write(f"  Berries: {names}\n\n")

def write_vitamins(compotes, filename="compote_vitamins.txt"):
    with open(filename, 'w') as file:
        for compote in compotes:
            file.write(f"{compote.name}\n")
            vits = ", ".join(compote.unique_vitamins())
            file.write(f"  Vitamins: {vits}\n\n")

def main():
    berries = read_berries()
    if not berries:
        print("No berries for today :(")
        return

    compotes = group_compotes(berries)
    write_descriptions(compotes)
    write_vitamins(compotes)
    print("Info successfully created!")

if __name__ == "__main__":
    main()
