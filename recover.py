import json

with open('C:/Users/Pekay/.gemini/antigravity/brain/b3b4bf16-84d8-47f8-aced-92a8ad825fcc/.system_generated/logs/transcript.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        if '+@import "tailwindcss";' in line:
            obj = json.loads(line)
            diff_text = ''
            if 'tool_calls' in obj:
                for tc in obj.get('tool_calls', []):
                    pass
            # Wait, it's actually in TOOL_RESPONSE step type
            if obj.get('type') == 'TOOL_RESPONSE' and 'tool_responses' in obj:
                for tr in obj['tool_responses']:
                    if '+@import "tailwindcss";' in tr.get('output', ''):
                        diff_text = tr['output']
            elif '+@import "tailwindcss";' in obj.get('content', ''):
                diff_text = obj['content']
            
            if diff_text:
                with open('recovered.diff', 'w', encoding='utf-8') as out:
                    out.write(diff_text)
                print('Recovered diff saved to recovered.diff')
                break
