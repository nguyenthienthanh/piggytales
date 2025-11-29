# Command: new

**Category:** Project
**Priority:** High
**Syntax:** `/tale new <type> "Title"`
**Alias:** `/t new`

---

## Description

Create a new PiggyTales content project.

---

## Usage

### Create Audiobook
```bash
/tale new audiobook "Truyen Co Tich Viet Nam"
```

### Create Animation
```bash
/tale new animation "Chuyen Phieu Luu Ky Dieu"
```

### Create Short Video
```bash
/tale new short "Bai Hoc Cuoc Song"
```

### Create Music Video
```bash
/tale new music-video "Hat Vui Ca"
```

---

## Project Types

| Type | Description | Default Workflow |
|------|-------------|------------------|
| `audiobook` | Audio narration with voice | Standard |
| `animation` | Scene-based visual storytelling | Full |
| `short` | TikTok/YouTube Shorts | Standard |
| `music-video` | Audio-visual music content | Standard |

---

## Output

```markdown
🐷🍄 PiggyTales - New Project Created!

📁 Project: truyen-co-tich-viet-nam
📝 Type: Audiobook
📅 Created: 2025-11-29 15:00:00
🎯 Audience: Not set (use /tale audience)
🔄 Workflow: Standard

Next steps:
1. Set target audience: /tale audience children
2. Choose preset: /tale preset audiobook-simple
3. Add source material: /tale source add "..."
4. Start workflow: /tale next

✨ Ready to tell amazing tales!
```

---

## Options

| Option | Description |
|--------|-------------|
| `--audience <type>` | Set target audience immediately |
| `--preset <name>` | Apply preset configuration |
| `--workflow <mode>` | Set workflow mode |

---

## Examples

```bash
# Quick audiobook for children
/tale new audiobook "Story" --audience children --preset audiobook-simple

# Full animation with family audience
/tale new animation "Adventure" --audience family --workflow full
```

---

**Version:** 1.0.0
