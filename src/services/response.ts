export interface YoudaoResponse {
  // 权威例句
  auth_sents_part: {
    more: string
    sent: {
      foreign: string
      score: number
      source: string
      speech: string
      'speech-size': string
      url: string
    }[]
    'sentence-count': number
  }
  // 双语例句
  blng_sents_part: {
    more: string
    'sentence-count': number
    'sentence-pair': {
      'aligned-words': {
        src: {
          chars: {
            '@e': string
            '@id': string
            '@s': string
            aligns: {
              sc: {
                '@id': string
              }[]
              tc: {
                '@id': string
              }[]
            }
          }[]
        }
        tran: {
          chars: {
            '@e': string
            '@id': string
            '@s': string
            aligns: {
              sc: {
                '@id': string
              }[]
              tc: {
                '@id': string
              }[]
            }
          }[]
        }
      }
      sentence: string
      'sentence-eng': string
      'sentence-speech': string
      'sentence-translation': string
      source: string
      'speech-size': string
      url: string
    }[]
    'trs-classify': {
      proportion: string
      tr: string
    }[]
  }
  // 柯林斯
  collins: {
    collins_entries: {
      basic_entries: {
        basic_entry: {
          cet: string
          headword: string
          wordforms: {
            wordform: {
              word: string
            }[]
          }
        }[]
      }
      entries: {
        entry: {
          tran_entry: {
            exam_sents?: {
              sent: {
                chn_sent: string
                eng_sent: string
              }[]
            }
            headword?: string
            pos_entry?: {
              pos: string
              pos_tips: string
            }
            seeAlsos?: {
              seeAlso: {
                seeword: string
              }[]
              seealso: string
            }
            sees?: {
              see: {
                seeword: string
              }[]
            }
            tran?: string
          }[]
        }[]
      }
      headword: string
      phonetic: string
      star: string
    }[]
  }
  collins_primary: {
    gramcat: {
      audio: string
      audiourl: string
      forms: {
        form: string
      }[]
      partofspeech: string
      pronunciation: string
      senses: {
        definition: string
        derivatives?: {
          audio: string
          audiourl: string
          forms?: {
            form: string
          }[]
          labelgrammar?: string
          partofspeech: string
          sense: {
            examples: {
              example: string
              sense: {
                lang: string
                word: string
              }
            }[]
            lang: string
            word: string
          }[]
          word: string
        }[]
        examples: {
          example: string
          sense: {
            lang: string
            word: string
          }
        }[]
        lang: string
        sensenumber: string
        word: string
      }[]
    }[]
    words: {
      indexforms: string[]
      word: string
    }
  }
  discriminate: {
    data: {
      headwords: string[]
      source: string
      tran: string
      usages: {
        headword: string
        usage: string
      }[]
    }[]
    'return-phrase': string
  }
  // 简明
  ec: {
    exam_type: string[]
    source: {
      name: string
      url: string
    }
    special: {
      major: string
      nat: string
    }[]
    web_trans: string[]
    word: {
      'return-phrase': string
      trs?: {
        pos?: string
        tran: string
      }[]
      ukphone: string
      ukspeech: string
      usphone: string
      usspeech: string
      wfs: {
        wf: {
          name: string
          value: string
        }
      }[]
    }
  }
  ee: {
    source: {
      name: string
      url: string
    }
    word: {
      phone: string
      'return-phrase': string
      speech: string
      trs: {
        pos: string
        tr: {
          'similar-words'?: string[]
          tran: string
        }[]
      }[]
    }
  }
  etym: {
    etyms: {
      zh: {
        desc: string
        source: string
        url: string
        value: string
        word: string
      }[]
    }
    word: string
  }
  expand_ec: {
    'return-phrase': string
    source: {
      name: string
      url: string
    }
    word: {
      pos: string
      transList: {
        content: {
          detailPos?: string
          examType?: {
            en: string
            zh: string
          }[]
          sents?: {
            sentOrig: string
            sentSpeech: string
            sentTrans: string
            source: string
            sourceType: string
            type?: string
            usages?: {
              phrase: string
              phraseTrans: string
            }[]
          }[]
        }
        trans: string
      }[]
      wfs: {
        name: string
        value: string
      }[]
    }[]
  }
  individual: {
    examInfo: {
      frequency: number
      questionTypeInfo: {
        time: number
        type: string
      }[]
      recommendationRate: number
      year: number
    }
    idiomatic: {
      colloc: {
        en: string
        zh: string
      }
    }[]
    level: string
    pastExamSents: {
      en: string
      source: string
      zh: string
    }[]
    'return-phrase': string
    trs: {
      pos: string
      tran: string
    }[]
  }
  input: string
  lang: string
  le: string
  media_sents_part: {
    more: string
    query: string
    sent: {
      '@mediatype': string
      chn?: string
      eng: string
      snippets: {
        snippet: {
          duration?: string
          imageUrl?: string
          name: string
          source: string
          sourceUrl?: string
          streamUrl: string
          swf: string
          win8?: string
        }[]
      }
      'speech-size'?: string
    }[]
    'sentence-count': number
  }
  meta: {
    dicts: string[]
    guessLanguage: string
    input: string
    isHasSimpleDict: string
    lang: string
    le: string
  }
  music_sents: {
    more: boolean
    sents_data: {
      coverImg: string
      id: string
      lyric: string
      lyricList: {
        duration: number
        lyric: string
        lyricTranslation?: string
        start: number
      }[]
      lyricTranslation: string
      playUrl: string
      singer: string
      songId: string
      songName: string
      supportCount: number
    }[]
    word: string
  }
  oxford: {
    encryptedData: string
  }
  oxfordAdvance: {
    encryptedData: string
  }
  oxfordAdvanceHtml: {
    encryptedData: string
  }
  phrs: {
    phrs: {
      headword: string
      translation: string
    }[]
    word: string
  }
  pic_dict: {
    pic: {
      host: string
      image: string
      url: string
    }[]
  }
  rel_word: {
    rels: {
      rel: {
        pos: string
        words: {
          tran: string
          word: string
        }[]
      }
    }[]
    stem: string
    word: string
  }
  senior: {
    encryptedData: string
    source: {
      name: string
    }
  }
  simple: {
    query: string
    word: {
      'return-phrase': string
      ukphone: string
      ukspeech: string
      usphone: string
      usspeech: string
    }[]
  }
  special: {
    'co-add': string
    entries: {
      entry: {
        major: string
        num: number
        trs: {
          tr: {
            chnSent?: string
            cite: string
            docTitle?: string
            engSent?: string
            nat: string
            url?: string
          }
        }[]
      }
    }[]
    summary: {
      sources: {
        source: {
          site: string
          url: string
        }
      }
      text: string
    }
    total: string
  }
  syno: {
    synos: {
      pos: string
      tran: string
      ws: string[]
    }[]
    word: string
  }
  video_sents: {
    sents_data: {
      contributor: string
      id: number
      subtitle_srt: string
      video: string
      video_cover: string
    }[]
    word_info: {
      'return-phrase': string
      sense: string[]
    }
  }
  web_trans: {
    'web-translation': {
      '@same'?: string
      key: string
      'key-speech': string
      trans: {
        summary?: {
          line: string[]
        }
        support?: number
        url?: string
        value: string
      }[]
    }[]
  }
  webster: {
    encryptedData: string
  }
  wikipedia_digest: {
    source: {
      name: string
      url: string
    }
    summarys: {
      key: string
      summary: string
    }[]
  }
  word_video: {
    word_videos: {
      ad: {
        avatar: string
        title: string
        url: string
      }
      video: {
        cover: string
        image: string
        title: string
        url: string
      }
    }[]
  }
  wordElaboration: {
    encryptedData: string
  }
}
